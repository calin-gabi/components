(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home
    "Home S home!"
   ]))