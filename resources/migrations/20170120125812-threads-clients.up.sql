CREATE TABLE IF NOT EXISTS threads_clients (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES threads(id) ON DELETE CASCADE ON UPDATE CASCADE,
    username VARCHAR(200) UNIQUE REFERENCES users(username),
    status VARCHAR(200),
    created TIMESTAMP default now()
);
