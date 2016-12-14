(ns components.core.config
  (:require
   [clj-http.cookies :as cookie]
   [ak-dbg.core :refer :all]
   [environ.core :refer [env]]))

(def auth-uris {:dev "http://localhost:4016"})

(def secret "mysecret")

(defonce db (str "jdbc:postgres://localhost"
                 "/components"
                 "?user=sa"
                 "&password=2vE7kG4fG.@w9T"))

(def trusted-algs #{:bcrypt+sha512})

(def smtp {:host "mail.softdata.ro"
           :user "office@softdata.ro"
           :pass "softy1964"})