(ns components.ctrl.middleware
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [ak-request.core :as ak-request]
   [buddy.auth.accessrules :refer [wrap-access-rules] :as rules]
   [buddy.auth.backends :as backends]
   [buddy.hashers :as hashers]
   [buddy.auth.middleware :refer [wrap-authentication]]
   [cheshire.core :as json]
   [components.core.config :as cfg]
   [compojure.core :refer [defroutes routes GET POST]]
   [components.models.token :as db-token]
   [hugsql.core :as hugsql]
   [ring.middleware.defaults :refer [site-defaults api-defaults wrap-defaults]]
   [ring.middleware.format-params :refer [wrap-restful-params]]
   [ring.middleware.keyword-params :refer [wrap-keyword-params]]
   [ring.middleware.params :refer [wrap-params assoc-form-params]]
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

;; #### AUTH
;; ## Authentication
(defn token-expand [req token]
  (let [res (db-token/identity-get token)]
   (or res false)))

(def backend (backends/token {:authfn token-expand}))

;; #### MIDDLEWARE
(defn middleware [handler]
  (-> handler
      (wrap-keyword-params)
      (wrap-restful-params)
      #_(wrap-access-rules {:rules rules :on-error on-error})
      (wrap-authentication backend)
      #_(log-request)
      #_(wrap-restful-format :formats [:json-kw :edn])
      (wrap-defaults ring-defaults*)
      ))
