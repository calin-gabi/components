(ns components.ctrl.chat
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [cheshire.core :as json]
   [clojure.java.io :as io]
   [clojure.java.jdbc :as jdbc]
   [clojure.spec :as sp]
   [compojure.core :refer [defroutes context routes GET POST]]
   [components.core.config :as cfg]
   [hugsql.core :as hugsql]
   [org.httpkit.server :as kit]
   [taoensso.encore :as enc]
   [taoensso.timbre :as log]))

(hugsql/def-db-fns "components/sql/account.sql")

(hugsql/def-db-fns "components/sql/chat.sql")

;; #### THREADS

(defn open-thread [username client]
  (let [thread (by-client-thread-read cfg/db {:username username :client client})
        thread* (if (some? thread)
                  thread
                  (jdbc/with-db-transaction [tx cfg/db]
                   (try 
                    (let [thread_ (dbg (thread-add! tx {:owner nil :name ""}))
                          thread_u (threads-client-add! tx (dbg {:thread_id (:id thread_) :username username :status nil}))
                          thread_c (threads-client-add! tx (dbg {:thread_id (:id thread_) :username client :status nil}))
                          thread_ (by-client-thread-read tx {:username username :client client})]
                      thread_)
                    (catch Exception ex
                      (jdbc/db-set-rollback-only! tx)
                      (log/error (.getMessage ex))
                      {:stat :err :msg "DB error"}))))]
        thread*))

(defn save-thread-msg! [username receiver message tx]
  (let [thread (open-thread (dbg username) receiver)
        saved-msg (thread-msg-insert! tx {:threadclient_id (:userthread_id thread) :message message})]
        true))

(defn save-msg! [msg]
  (let [username (:sender msg)
        receivers (:receivers msg)
        message (:msg (:payload msg ))]
        (jdbc/with-db-transaction [tx cfg/db]
          (try
            (doseq [receiver receivers]
              (save-thread-msg! username (:username receiver) message tx))
            (catch Exception ex
              (jdbc/db-set-rollback-only! tx)
              (log/error (.getMessage ex))
              {:stat :err :msg "DB error"})))))

;; #### WEB SOCKETS
(def clients (atom {}))

(defn ws-only-warning []
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body "Websockets only"})

(defn channel-add! [client-m username channel]
  (update-in client-m [username] merge {channel {:on true}}))

(defn channel-rem! [client-m username channel]
  (update-in client-m [username] dissoc channel))

(defn by-channel-username-get [channel]
  (ffirst (filter (fn [[username channels]] (get channels channel)) @clients)))

(defn channel-online? [channel]
  (as-> @clients X
    (filter (fn [[username channels]] (get channels channel)) X)
    (first X)
    (second X)
    (get X channel)
    (:on X)
    (if X true false)))

(defn to-all-send! [method username channel receivers payload]
  (let [username (by-channel-username-get channel)
        user-channels (->> (get @clients username)
                           (map first)
                           (remove #(= % channel)))
        receivers-channels (->> (map #(get @clients (:username %)) receivers)
                                (map keys)
                                (flatten))
        all-channels (concat user-channels receivers-channels)
        msg (json/generate-string {:method method :sUsername username :payload payload})]

    (doseq [chan all-channels
            :when (channel-online? chan)]
      (kit/send! chan msg))))

(defn allowed? [channel msg]
  true)

(defn reply-send! [method username payload]
  (let [user-channels (->> (get @clients username)
                           (map first))
        msg (json/generate-string {:method method :sUsername username :payload payload})]

    (doseq [chan user-channels
            :when (channel-online? chan)]
      (kit/send! chan msg))))

(defn send! [chan msg]
  (let [{:keys [sender receivers token payload timestamp status chan_id]} msg]

    (if (allowed? chan msg)
      (let []
       (kit/send! chan msg))

      "Not authorized")))

(defn handshake! [chan msg]
  (if (allowed? chan msg)
    (let [username (:sender msg)]
      (log/info username :connected)
      (swap! clients channel-add! username chan)
      (kit/send! chan (json/generate-string {:method "handshake" :clients @clients :stat :ok})))

    "Not authorized"))

(defn on-receive [channel msg]
  (let [msg* (dbg (json/parse-string msg true))
        username (:sender msg*)
        receivers (:receivers msg*)]

    (case (dbg (:method msg*))
      "handshake" (handshake! channel msg*)

      "chat-msg"    (let [payload {:msg (get-in msg* [:payload :msg])}
                          msg_ (save-msg! msg*)
                          msg_ (assoc (msg*) :timestamp (:created msg*))
                          msg_send (reply-send! "msg-status" username {:msg msg_})]
                      (to-all-send! "chat-msg" username channel receivers payload)
                      #_(queue/msg-add! msg)
                      #_(send! client-id recievers msg)))))

(defn on-close [channel status]
  (log/info status channel))

(defn ws-handler [{:keys [params] :as req}]
  (if (:websocket? req)
    (kit/with-channel req channel

      (kit/on-receive channel (fn [msg] (on-receive channel msg)))

      (kit/on-close channel (fn [status] (on-close channel status)))

      #_(add-watch msgs))

    (ws-only-warning)))

(defn user-online? [client]
  (let [chn (get @clients (:username client))
        online (if (some? chn)
                true
                false)
        client* (assoc client :online online)]
        client*))

(defn client_thread [threads client]
  (let [thread (filter (fn [t] (= (dbg (:username (dbg t))) (:username client))) threads)
        has_thread (if (= (count thread) 0)
                      false
                      true)
        client* (assoc client :thread_id (:id (first thread)))]
      client*))
  
(defn get-clients [{:keys [identity] :as req}]
  (json/generate-string
    (let [username (:username identity)
          clients (clients-read cfg/db {:username username})
          threads (dbg (by-username-threads-read cfg/db {:username username}))
          clients* (map #(client_thread threads %) clients)
          res (map user-online? clients*)]
     {:stat :ok :res res})))

(defn get-messages [{:keys [identity params] :as req}]
  (json/generate-string
    (let [username (:username identity)
          client (:username (:client params))
          lastmsg-id (:lastmsg_id params)
          thread (dbg (open-thread username client))
          messages (thread-msg-read cfg/db {:thread_id (:id thread) :lastmsg_id lastmsg-id :records 20})]
    {:res (dbg messages)})))

(defn search-clients [{:keys [identity params] :as req}]
  (json/generate-string
    (let [username (:username identity)
          usersfilter (:usersfilter params)
          res (clients-search cfg/db (dbg {:username username :usersfilter usersfilter}))]
        {:res res})))

(defn select-client [{:keys [identity params] :as req}]
  (json/generate-string
    (let [username (:username identity)
          client (:username params)
          selected (:selected params)
          id (:id params)
          res (if selected
                (client-insert! cfg/db {:username username :client client})
                (client-delete! cfg/db {:id id}))]
        {:res res})))

(defroutes chat-routes
  (context "/chat" [req]
    (GET "/" req (ws-handler req))
    (context "/clients" [req]
      (POST "/" req (get-clients req))
      (POST "/search" req (search-clients req))
      (POST "/select" req (select-client req)))
    (POST "/messages" req (get-messages req))))
