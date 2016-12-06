CREATE TABLE IF NOT EXISTS users (
  rev INT NOT NULL DEFAULT 0,
  created TIMESTAMP default now(),
  username VARCHAR (200) PRIMARY KEY,
  password VARCHAR (2000) NOT NULL,
  last_login TIMESTAMP,
  attempts INT DEFAULT 0,
  lockoutDate TIMESTAMP,
  twoFactor BOOLEAN DEFAULT FALSE,
  email VARCHAR (200),
  emailConfirmed BOOLEAN DEFAULT FALSE,
  phone VARCHAR (200),
  phoneConfirmed BOOLEAN DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE
);
