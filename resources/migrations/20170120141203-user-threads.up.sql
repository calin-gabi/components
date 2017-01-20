CREATE OR REPLACE VIEW public.user_threads AS
 SELECT DISTINCT threads.id,
    threads_clients.username
   FROM threads
     JOIN threads_clients ON threads.id = threads_clients.thread_id;;