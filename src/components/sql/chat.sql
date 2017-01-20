-- :name by-username-threads-read :? :n
SELECT ut_1.id, ut_1.username
FROM user_threads AS ut_1
JOIN user_threads AS ut_2 ON ut_1.id = ut_2.id
WHERE ut_1.username != :username AND ut_2.username = :username;

-- :name thread-add! :<! :1
INSERT INTO threads(owner, name)
VALUES (:owner, :name)
RETURNING *;

-- :name threads-client-add! :<! :1
INSERT INTO threads_clients(thread_id, username, status)
VALUES (:thread_id, :username, :status)
RETURNING *;
