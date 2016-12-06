(ns components.models.token
  (:require
   [ak-dbg.core :refer :all]
   [components.core.config :as cfg]
   [buddy.sign.jwt :as jwt]
   [clojure.set :as set]
   [clojure.spec :as sp]
   [taoensso.timbre :as log]))

(defonce tokens (atom #{}))

(sp/def ::min-token-create! #(and (string? %) (seq %)))

(defn token-create! [username roles]
  (if (sp/valid? ::min-token-create! username)
    (let [payload {:username username :roles roles}
          token (jwt/sign payload cfg/secret)]

      (swap! tokens conj token)
      {:stat :ok :res token})

    {:stat :err :msg "Insufficient data"}))

(defn token-remove! [token]
  (let [old-cnt (count @tokens)
        res (swap! tokens disj token)
        new-cnt (count res)]

    (if (< new-cnt old-cnt)
      {:stat :ok :res res}
      {:stat :err :msg "Token not found"})))

(defn token-valid? [token]
  (contains? @tokens token))

(defn token-unsign [token]
  (jwt/unsign token cfg/secret))

(defn identity-get [token]
  (if (token-valid? token)
    (token-unsign token)
    false))
