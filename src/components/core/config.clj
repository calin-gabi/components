(ns components.core.config
  (:require
   [clj-http.cookies :as cookie]
   [ak-dbg.core :refer :all]
   [environ.core :refer [env]]))

(def app-api-cred {:username "dashboard-system" :password "D*w^8Bxi"})

(def auth-cred {:username "s100-system" :password "tr@1nersdajklh28"})

(def auth-uris {:dev "http://localhost:6029"})

(defonce db (str "jdbc:postgres://localhost"
                 "/dashboard_pre"
                 "?user=clj"
                 "&password=4jwSw@54FDykI@OeZ@Vt"))
