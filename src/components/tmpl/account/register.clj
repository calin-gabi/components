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


       [:fieldset
        {:formGroupName "passwords"}
        [:div.row
         [:div.col-sm-6
          [:div.form-group
           [:input.form-control
            {:formControlName "password"
             :required ""
             :type "password"
             :placeholder "Password"}]]]

         [:div.col-sm-6
          [:div.form-group
           [:input.form-control
            {:formControlName "password_rep"
             :required ""
             :type "password"
             :placeholder "Password"}]]]]]

      [:div.text-danger
       {"*ngIf" "errMsg"}
       "{{errMsg}}"]

      [:button.btn.btn-register.center-block
       {"[disabled]" "!form.valid"
        :type "submit"}
       "Register"]]]]]))

