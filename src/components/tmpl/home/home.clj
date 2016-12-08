(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [cemerick.friend :as friend]
   [components.ctrl.middleware :as middl]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home
    [:div 
    "Home S home!"]
    [:div ]
    [:a {"routerLink" "/logout"} "Logout"]

   ]))