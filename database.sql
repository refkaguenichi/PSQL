CREATE DATABASE todo_db;

--\into todo_database

CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
description VARCHAR(255)
);