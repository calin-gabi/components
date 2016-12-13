(ns components.ctrl.index
  (:require
   [ak-dbg.core :refer :all]
   [cheshire.core :as json]
   [compojure.core :refer [context defroutes GET POST]]
   [components.tmpl.core.core :as t-core]
   [ring.util.response :refer [response content-type]]))

;; #### PAGES
(defn index-page [{:keys [session] :as req}]
  (let []
    (-> req
        (t-core/page)
        (response)
        (content-type "text/html; charset=utf-8"))))

;; #### ROUTES
(defroutes index-routes
  (GET "/" req (index-page req))
  (GET "/home" req (index-page req))
  (GET "/login" req (index-page req))
  (GET "/register" req (index-page req))
  (GET "/oauth2callback" req (index-page req))
  (GET "/404" req "404: Page not found."))
