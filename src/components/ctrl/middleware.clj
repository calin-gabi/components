(ns components.ctrl.middleware
  (:require
   [ak-checker.core :refer [ok?]]
   [ak-dbg.core :refer :all]
   [ak-request.core :as ak-request]
   [buddy.auth :refer [authenticated?]]
   [buddy.auth.accessrules :refer [wrap-access-rules] :as rules]
   [buddy.auth.backends :as backends]
   [buddy.auth.middleware :refer [wrap-authentication]]
   [components.core.config :as cfg]
   [ring.middleware.defaults :refer [site-defaults api-defaults wrap-defaults]]
   [ring.middleware.format-params :refer [wrap-restful-params]]
   [ring.middleware.keyword-params :refer [wrap-keyword-params]]
   [ring.middleware.params :refer [wrap-params assoc-form-params]]
   [taoensso.timbre :as log]))

(def ring-defaults*
  (merge site-defaults

         {:params {:keywordize true
                   :multipart true
                   :nested true
                   :urlencoded true}}

         {:static {:resources false}}

         {:session {:cookie-attrs {:max-age 604800}
                    :cookie-name "session"}}

         {:security {:anti-forgery false}}))

#_(defn log-request [hanmiddlewaredler]
  (fn [req]
    (let [resp (handler req)]
      #_(dbg req)
      #_(dbg resp)
      #_resp)))

;; #### AUTH
;; ## Authentication
(defn token-expand [req token]
  (let [url (str (:dev cfg/auth-uris) "/tokens/identity")
        body {:token token}
        res (ak-request/post-call! {:url url :body body :ks true})]

    (or (get-in res [:body :res]) false)))

#_(def secret "my big dashboard secret")

(def backend (backends/token {:authfn token-expand}))

;; ## Authorization
(defn trainer? [{:keys [identity] :as req}]
  #_(dbg req)
  (if (contains? (set (:scopes identity)) "s100-user")
    (rules/success)
    (rules/error "Not authorized")))

(def rules
  [{:uri "/do"
    :handler trainer?}

   {:uri "/data*"
    :handler trainer?}

   {:uri "/training*"
    :handler trainer?}])

(defn on-error [req value]
  {:status 403
   :headers {}
   :body "Not authorized"})

;; #### MIDDLEWARE
(defn middleware [handler]
  (-> handler
      (wrap-keyword-params)
      (wrap-restful-params)
      (wrap-access-rules {:rules rules :on-error on-error})
      (wrap-authentication backend)
      #_(log-request)
      #_(wrap-restful-format :formats [:json-kw :edn])
      (wrap-defaults ring-defaults*)))
