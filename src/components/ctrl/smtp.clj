(ns components.ctrl.smtp
  (:require
    [ak-checker.core :refer [ok?]]
    [ak-dbg.core :refer :all]
    [postal.message   :as msg]
    [postal.core :refer [send-message]]
    [cheshire.core :as json]
    [compojure.core :refer [context defroutes GET POST]]
    [components.core.config :as cfg]
    [components.tmpl.email.templates :as emailtemplates]
    [taoensso.nippy :as nippy]
    [taoensso.timbre :as log]))

(defn send-email [{:keys [params] :as req}]
  (json/generate-string
    (try
      (let [content (emailtemplates/Hello {:name (:name params)})
            params_ (assoc params :body [{:type "text/html" :content content}])
            res  (send-message cfg/smtp params_)]
            {:stat :ok :res (dbg res)})
        (catch Exception ex
        (log/error (.getMessage ex))
            {:stat :err :msg "send error"}))))
                   
;; #### ROUTES
(defroutes smtp-routes
  (POST "/smtp/send" req (send-email req)))