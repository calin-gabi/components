(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home
    [:div#navigation.container
      [:div.col-md-4
        {"*ngIf" "state.userProfile"}
        "Welcome home {{state.userProfile.first_name}} {{state.userProfile.last_name}}!"]
      [:div.col-md-7
        [:button.btn 
          {"(click)" "sendTestEmail()"}
          "Test email"]]
      [:div.col-md-1
        [:button.btn
          {"(click)" "logout()"}
          "Logout"]]]
    #_[:a {"routerLink" "/logout"} "Logout"]
    #_[:chat]
   ]))