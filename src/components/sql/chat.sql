-- :name clients-read :? :*
SELECT threads_user_clients.client FROM threads_user_clients
WHERE username = :username;

-- :name clients-search :? :*
SELECT users.username, threads_user_clients.id FROM users
LEFT JOIN threads_user_clients ON threads_user_clients.client = users.username
WHERE users.username LIKE '%' || :usersfilter || '%' AND users.username != :username;

-- :name client-insert! :<1 :1
INSERT INTO threads_user_clients(username, client)
VALUES (:username, :client)
RETURNING *;

-- :name client-delete! :! :1
DELETE FROM threads_user_clients
WHERE id = :id;

-- :name by-username-threads-read :? :*
SELECT ut_1.id, ut_1.username, ut_2.threadclient_id AS userthread_id, ut_1.threadclient_id AS receiverthread_id
FROM user_threads AS ut_1
JOIN user_threads AS ut_2 ON ut_1.id = ut_2.id
WHERE ut_1.username != :username AND ut_2.username = :username;

-- :name by-client-thread-read :? :1
SELECT ut_1.id, ut_1.username, ut_2.threadclient_id AS userthread_id, ut_1.threadclient_id AS receiverthread_id
FROM user_threads AS ut_1
JOIN user_threads AS ut_2 ON ut_1.id = ut_2.id
WHERE ut_1.username = :client AND ut_2.username = :username;

-- :name thread-add! :<! :1
INSERT INTO threads(owner, name)
VALUES (:owner, :name)
RETURNING *;

-- :name threads-client-add! :<! :1
INSERT INTO threads_clients(thread_id, username, status)
VALUES (:thread_id, :username, :status)
RETURNING *;

-- :name thread-id-read :? :1
SELECT t_1.id
FROM threads_clients AS tc_1
JOIN threads_clients AS tc_2 ON tc_1.id = tc_2.id 
WHERE tc_1.username = :username AND tc_2.username = :receiver

-- :name thread-msg-insert! :<1 :1
INSERT INTO threads_messages(threadclient_id, message, status)
VALUES (:threadclient_id, :message, 'send')
RETURNING *;

-- :name thread-msg-upd! :<1 :1
UPDATE threads_messages
SET status = :status
WHERE id = :id
RETURNING *;

-- :name thread-msg-read :? :*
SELECT threads_messages.*, threads_clients.username
FROM threads_messages
JOIN threads_clients ON threads_clients.ID = threads_messages.threadclient_id
WHERE threads_clients.thread_id = :thread_id 
/*~ (when (> (:lastmsg_id params) 0) */
AND (threads_messages < :lastmsg_id )
/*~ ) ~*/
ORDER BY threads_messages.created DESC
LIMIT :records;