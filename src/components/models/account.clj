(ns components.models.account
  (:require
   [ak-dbg.core :refer :all]
   [components.core.config :as cfg]
   [components.models.token :as db-token]
   [buddy.sign.jwt :as jwt]
   [clojure.java.jdbc :as jdbc]
   [clojure.set :as set]
   [clojure.spec :as sp]
   [hugsql.core :as hugsql]
   [taoensso.timbre :as log]))

(hugsql/def-db-fns "components/sql/account.sql")

;; #### OAUTH
(defn oauth-get [params]
  (let [oauth-id (:sub params)
        user (by-oauth-user-read cfg/db {:oauth_id oauth-id})]
    (if (= user nil)
      {:user user :res params}
      (let [username (:username user)
            roles (->> {:username username}
                            (by-username-user-roles-read cfg/db)
                            (map :role))
            userprofile (by-user-userprofile-read cfg/db {:username username})
            db-user* (assoc user :roles roles :profile userprofile)]
        {:user (select-keys db-user* [:username :roles :profile])
         :token (:res (db-token/token-create! username roles {}))}))))

(defn oauth-set! [params]
  (let [user 
            (jdbc/with-db-transaction [tx cfg/db]
              (try
                (let [user_ (by-user-oauth-create! tx params)
                      useroauth (by-user-useroauth-create! tx params)
                      userprofile (by-user-userprofile-create! tx params)
                      userroles (user-role-insert! tx {:username (:username params) :role "user"})]
                  userprofile)
                (catch Exception ex
                  (log/error (.getMessage ex))
                  (jdbc/db-set-rollback-only! tx)
                  {:stat :err})))]
    (if (= user nil)
      {:user user :res params}
      {:user user :res user})))

