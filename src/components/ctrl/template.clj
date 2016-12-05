(ns components.ctrl.template
  (:require
   [ak-dbg.core :refer :all]
   [compojure.core :refer [context defroutes GET POST]]
   [hiccup.core :refer [html]]
   [ring.util.response :refer [response content-type]]
   [taoensso.timbre :as log]))

(defn response-wrap [template]
  (let [template* (html template)]
    (-> template*
        (response)
        (content-type "text/html; charset=utf-8"))))

(defmulti template (fn [{:keys [params]}] (:type params)))

(defmethod template :default [{:keys [params] :as req}]
  (log/error "template not found:" (:type params)))

(defmethod template "main" [{:keys [] :as req}]
  (response-wrap
   [:div
    [:router-outlet]]))

(defroutes template-routes
  (GET "/template" req (template req)))