CREATE TABLE IF NOT EXISTS threads_messages (
    id SERIAL PRIMARY KEY,
    threadclient_id INTEGER REFERENCES threads_clients(id) ON DELETE CASCADE ON UPDATE CASCADE,
    type VARCHAR(200),
    message VARCHAR(2000),
    status VARCHAR(200),
    created TIMESTAMP default now()
);
