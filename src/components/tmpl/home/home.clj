(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home
    [:div 
    "Home S home!"]
    [:div ]
    [:a {"routerLink" "/logout"} "Logout"]
    [:button 
      {"(click)" "googleLogout()"}
      "Google logout"]

   ]))