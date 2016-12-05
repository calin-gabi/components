(ns components.tmpl.account.register
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "register" [{:keys [] :as req}]
  (response-wrap
   [:div#register
    [:div.container-fluid
    [:div.register-form
     [:h3 "Register"]

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

     [:div.form-group
      [:input.retypepassword.form-control
       {:formControlName "retypepassword"
        "[placeholder]" "'Password'"
        :required ""
        :type "password"}]]

      [:div.text-danger
       {"*ngIf" "errMsg"}
       "{{errMsg}}"]

      [:button.btn.btn-register.center-block
       {"[disabled]" "!form.valid"
        :type "submit"}
       "Register"]]]]]))