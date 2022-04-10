CREATE DATABASE db_comment;

USE db_comment;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

INSERT INTO users (id, username, password) 
  VALUES (1, 'luis', 'luis123');

SELECT * FROM users;

-- comment TABLE
CREATE TABLE comment (
  id INT(11) NOT NULL,
  subjectName VARCHAR(150) NOT NULL,
  website VARCHAR(255) NOT NULL,
  textDescription VARCHAR(255),
  email VARCHAR(255),
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE comment
  ADD PRIMARY KEY (id);

ALTER TABLE comment
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE comment;