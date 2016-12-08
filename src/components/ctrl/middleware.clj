(ns components.ctrl.middleware
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [ak-request.core :as ak-request]
   [cheshire.core :as json]
   [components.core.config :as cfg]
   [compojure.core :refer [defroutes routes GET POST]]
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

;; #### MIDDLEWARE
(defn middleware [handler]
  (-> handler
      (wrap-keyword-params)
      (wrap-restful-params)
      #_(wrap-access-rules {:rules rules :on-error on-error})
      #_(wrap-authentication backend)
      #_(log-request)
      #_(wrap-restful-format :formats [:json-kw :edn])
      (wrap-defaults ring-defaults*)
      ))
