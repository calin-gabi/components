(ns components.ctrl.oauth
  (:require [cemerick.friend        :as friend]
            [friend-oauth2.workflow :as oauth2]
            [friend-oauth2.util     :refer [format-config-uri]]
            [ring.util.codec        :as codec]
            #_[environ.core           :refer [env]]))

(def client-config
  {:client-id     "198071236552-1rurcpfidu8fmhorrdkk6nb450hfk1b6.apps.googleusercontent.com"
   :client-secret "PFJQHjWIUEZSZ0zhxZYseqMd"
   :callback      {:domain "http://localhost:4016" ;; replace this for production with the appropriate site URL
                   :path "/oauth2callback"}})

(defn credential-fn [token]
    {:identity token
     :roles #{::user}})

(def uri-config
  {:authentication-uri {:url "https://accounts.google.com/o/oauth2/auth"
                        :query {:client_id (:client-id client-config)
                               :response_type "code"
                               :redirect_uri (format-config-uri client-config)
                               :scope "email"}}

   :access-token-uri {:url "https://accounts.google.com/o/oauth2/token"
                      :query {:client_id (:client-id client-config)
                              :client_secret (:client-secret client-config)
                              :grant_type "authorization_code"
                              :redirect_uri (format-config-uri client-config)}}})
(def friend-config
  {:allow-anon? true
   :workflows   [(oauth2/workflow
                  {:client-config client-config
                   :uri-config uri-config
                   :credential-fn credential-fn})
                   ]})