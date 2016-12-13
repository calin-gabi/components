(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home.container-fluid
    [:div#navigation.col-md-12.container
      [:div.col-md-4
        {"*ngIf" "state.userProfile"}
        "Welcome home {{state.userProfile.first_name}} {{state.userProfile.last_name}}!"]
      [:div.col-md-4]
      [:div.col-md-4
        [:button 
          {"(click)" "logout()"}
          "Logout"]]]
    [:a {"routerLink" "/logout"} "Logout"]
    #_[:chat]
   ]))