(ns components.ctrl.token
  (:require
   [ak-dbg.core :refer :all]
   [ak-checker.core :refer [ok?]]
   [components.models.token :as db-token]
   [cheshire.core :as json]
   [compojure.core :refer [context defroutes GET POST]]))

;; #### API
(defn token-valid? [{:keys [params] :as req}]
  (json/generate-string
   (if-let [res (db-token/token-valid? (:token params))]
     {:stat :ok :res res}
     {:stat :err})))

(defn identity-get [{:keys [params] :as req}]
  (json/generate-string
   (if-let [res (db-token/identity-get (:token params))]
     {:stat :ok :res res}
     {:stat :err})))

;; #### ROUTES
(defroutes token-routes
  (GET "/token/valid" req (token-valid? req))
  (GET "/token/identity" req (identity-get req)))
