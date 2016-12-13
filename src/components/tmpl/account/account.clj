(ns components.tmpl.account.account
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "registerconfirmation" [{:keys [] :as req}]
  (response-wrap
   [:div#register-confirmation
    "Register confirmation"]))

(defmethod template "emailconfirmation" [{:keys [] :as req}]
  (response-wrap
   [:div#email-confirmation
    "Register"]))

(defmethod template "forgotpassword" [{:keys [] :as req}]
  (response-wrap
   [:div#forgot-password
    "Forgot password"]))

(defmethod template "oauth2callback" [{:keys [] :as req}]
  (response-wrap
   [:div#oauth2callback.container-fluid.col-lg-4
    [:div.waiting
      {"[class.hidden]" "waiting"}
      "Waiting"]
     [:form
      {"[formGroup]" "form"
       "(ngSubmit)" "submit()"
       "[class.hidden]" "!waiting"}
        [:h3 "Oauth2callback"] 

       [:div.form-group
        [:input.username.form-control
          {:formControlName "username"
            "[placeholder]" "'Username'"
            :required ""}]

        [:input.first_name.form-control
          {:formControlName "first_name"
            "[placeholder]" "'first name'"
            :required ""}]

        [:input.last_name.form-control
          {:formControlName "last_name"
            "[placeholder]" "'last name'"
            :required ""}]

        [:input.sub.form-control.hidden
          {:formControlName "sub"}]

        [:input.iss.form-control.hidden
          {:formControlName "iss"}]]

        [:div.text-danger
          {"*ngIf" "errMsg"}
          "{{errMsg}}"]

        [:button.btn.btn-register.center-block
        {:type "submit"}
        "Submit"]]]))