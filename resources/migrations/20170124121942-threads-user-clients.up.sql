CREATE TABLE IF NOT EXISTS threads_user_clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
    client VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(200),
    created TIMESTAMP default now(),
    UNIQUE (username, client) INITIALLY DEFERRED
);
