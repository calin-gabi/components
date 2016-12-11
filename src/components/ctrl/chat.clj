(ns components.ctrl.chat
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [cheshire.core :as json]
   [clojure.java.io :as io]
   [clojure.spec :as sp]
   [compojure.core :refer [defroutes routes GET POST]]
   [org.httpkit.server :as kit]
   [taoensso.encore :as enc]
   [taoensso.timbre :as log]))

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
        receivers-channels (->> (map #(get @clients %) receivers)
                                (map keys)
                                (flatten))
        all-channels (concat user-channels receivers-channels)
        msg (json/generate-string {:method method :sUsername username :payload payload})]

    (doseq [chan all-channels
            :when (channel-online? chan)]
      (kit/send! chan msg))))

(defn allowed? [channel msg]
  true)

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
      (kit/send! chan (json/generate-string {:method "handshake" :stat :ok})))

    "Not authorized"))

(defn on-receive [channel msg]
  (let [msg* (json/parse-string msg true)
        username (:sender msg*)
        receivers (:receivers msg*)]

    (if (= (:method msg*) "handshake")
      (let []
        (handshake! username channel))

      (let [payload {:msg (get-in msg* [:payload :msg])}]
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

(defroutes chat-routes
  (GET "/chat" req (ws-handler req)))
