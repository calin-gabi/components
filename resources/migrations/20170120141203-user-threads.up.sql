CREATE OR REPLACE VIEW public.user_threads AS
 SELECT DISTINCT threads.id,
    threads_clients.username, threads_clients.id AS threadclient_id
   FROM threads
     JOIN threads_clients ON threads.id = threads_clients.thread_id;;