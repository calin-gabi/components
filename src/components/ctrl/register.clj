(ns components.ctrl.register
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [ak-request.core :as ak-request]
   [cheshire.core :as json]
   [clojure.java.jdbc :as jdbc]
   [clojure.java.io :as cio]
   [clojure.spec :as sp]
   [compojure.core :refer [context defroutes GET POST]]
   [dashboard.core.config :as cfg]
   [hugsql.core :as hugsql]
   [mpg.core :as mpg]
   [ring.util.response :refer [response file-response content-type]]
   [taoensso.nippy :as nippy]
   [taoensso.timbre :as log]))

;; #### API
(defn user-exists? [{:keys [params] :as req}]
  (json/generate-string
   (let [res :ok]

     (if (ok? res)
       (:body res)
       {:stat :err :msg "General error"}))))

(sp/def ::min-reg-profile (sp/keys :req-un [::password ::username]))

(defn register! [{:keys [params] :as req}]
  (json/generate-string 
    (if (and (sp/valid? ::min-reg-profile (:profile params)))
      (try
        (let [res :ok]
            {:stat res})
         (catch Exception ex
           (log/error (.getMessage ex))
           {:stat :err :msg "DB error"})))))
           
;; #### ROUTES
(defroutes register-routes
  (GET "/userexists/:username" req (user-exists? req))
  (POST "/register" req (register! req)))