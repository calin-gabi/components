(ns components.tmpl.account.login
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "login" [{:keys [] :as req}]
  (response-wrap
   [:div#login
    [:div.container-fluid
    [:div.login-form
     [:h3 "Login"]

     [:form
      {"[formGroup]" "form"
       "(ngSubmit)" "submit()"}

     [:div.form-group
      [:input.username.form-control
       {:formControlName "username"
        "[placeholder]" "'Username'"
        :required ""
        :autofocus ""}]]

     [:div.form-group
      [:input.password.form-control
       {:formControlName "password"
        "[placeholder]" "'Password'"
        :required ""
        :type "password"}]]

      [:div.text-danger
       {"*ngIf" "errMsg"}
       "{{errMsg}}"]

      [:div.forget-password
       [:a
        {"[routerLink]" "['/password']"
         "routerLinkActive" "active"}
        "forgot my password"]]

      [:button.btn.btn-login.center-block
       {"[disabled]" "!form.valid"
        :type "submit"}
       "Login"]

      [:a.btn.btn-register.center-block
       {"[routerLink]" "['/register']"
        "routerLinkActive" "active"}
       "Register"]]]]]))
