-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS github_users CASCADE;

DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  login TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  github_users BIGINT,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  FOREIGN KEY (github_users) REFERENCES github_users(id)
);

INSERT INTO
  posts (title, description)
VALUES
  ('hello', 'description'),
  ('hi', 'another description'),
  ('another title', 'last description');

INSERT INTO
  github_users (login, email, avatar)
VALUES
  ('username1', 'username1@testing.com', 'avatar'),
  ('username2', 'username2@testing.com', 'avatar'),
  ('username3', 'username3@testing.com', 'avatar');