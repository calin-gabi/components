(ns components.tmpl.home.home
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "home" [{:keys [] :as req}]
  (response-wrap
   [:div#home.container-fluid
    [:div#navigation.col-md-12.container
      [:div.col-lg-4
        {"*ngIf" "state.userProfile"}
        "Welcome home {{state.userProfile.first_name}} {{state.userProfile.last_name}}!"]
      [:div.col-lg-7]
      [:div.col-lg-1
        [:button.btn
          {"(click)" "logout()"}
          "Logout"]]]
    #_[:a {"routerLink" "/logout"} "Logout"]
    #_[:chat]
   ]))