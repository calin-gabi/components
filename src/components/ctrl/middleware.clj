(ns components.ctrl.middleware
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [ak-request.core :as ak-request]
   [buddy.hashers :as hashers]
   #_[cemerick.friend :as friend]
   [cheshire.core :as json]
   [components.core.config :as cfg]
   [compojure.core :refer [defroutes routes GET POST]]
   #_[cemerick.friend.workflows :refer [make-auth]]
   #_(cemerick.friend [workflows :as workflows]
                    [credentials :as creds])
   [hugsql.core :as hugsql]
   [ring.middleware.defaults :refer [site-defaults api-defaults wrap-defaults]]
   [ring.middleware.format-params :refer [wrap-restful-params]]
   [ring.middleware.keyword-params :refer [wrap-keyword-params keyword-params-request]]
   [ring.middleware.params :refer [wrap-params assoc-form-params]]
   [ring.middleware.session :refer [wrap-session]]
   [ring.util.response :as response]
   [taoensso.timbre :as log]))

(hugsql/def-db-fns "components/sql/account.sql")

(def ring-defaults*
  (merge site-defaults

         {:params {:keywordize true
                   :multipart true
                   :nested true
                   :urlencoded true}}

         {:static {:resources false}}

         {:session {:cookie-attrs {:max-age 604800}
                    :cookie-name "session"}}

         {:security {:anti-forgery false}}))

; #_(defn do-login [req]
;  (let [params (json/parse-string (slurp (:body req)) true)
;        credential-fn (get-in req [::friend/auth-config :credential-fn])]
;    (make-auth (dbg (credential-fn (select-keys params [:username :password]))))))

; #_(defn password-workflow [req]
;   (when (and (= (:request-method req) :post)
;              (= (:uri req) "/login"))
;         (do-login req)))

; #_(defn password-credential-fn [{:keys [username password] :as creds}]
;   (when-let [user (by-username-user-read cfg/db {:username username})]
;     (when (hashers/check password (:password user))
;      {:identity (:username user) :roles #{::user} :user user})))

; #_(defroutes app-routes
;   (GET "/" [] "Hello everyone <form action=\"logout\" method=\"post\"><button>Submit</button></form>")
;   (GET "/authorized" [] 
;         (friend/authorize #{::user} (str "You have successfully authenticated as "
;                                                             (friend/current-authentication))))
;   (friend/logout (POST "/logout" [] "logging out")))

      ; #_(friend/authenticate {:workflows [password-workflow]
      ;                       :credential-fn password-credential-fn})
;; #### MIDDLEWARE
(defn middleware [handler]
  (-> handler
      (wrap-keyword-params)
      (wrap-params)
      (wrap-session)
      ))
