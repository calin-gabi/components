(ns components.tmpl.account.account
  (:require
   [ak-dbg.core :refer :all]
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "login" [{:keys [] :as req}]
  (response-wrap
   [:div#login.hvr-float-shadow
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
       "Register"]     
      [:button.btn.btn-google.center-block
       {"(click)" "login()"}
       "Google"]]]]]))


(defmethod template "register" [{:keys [] :as req}]
  (response-wrap
   [:div#register.hvr-glow
    [:div.container-fluid
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
       "Register"]]]]))

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
   [:div#oauth2callback.hvr-glow
    [:div.waiting
      {"[class.hidden]" "!waitingLoad()"}
      "Waiting"]
     [:form
      {"[formGroup]" "form"
       "(ngSubmit)" "submit()"
       "[class.hidden]" "waitingLoad()"}
        [:h3 "Please confirm your personal data"] 

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