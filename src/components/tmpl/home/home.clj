(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home
    [:div 
    "Welcome home {{user.name}}!"
      #_[:img 
        {:src "{{user.picture}}"}]]
    [:div ]
    [:a {"routerLink" "/logout"} "Logout"]
    [:button 
      {"(click)" "googleLogout()"}
      "Google logout"]
    [:chat]
    

   ]))