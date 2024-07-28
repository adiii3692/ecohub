CREATE DATABASE ecohub;

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255));

CREATE TABLE challenge(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)),
    max_progress INT;

CREATE TABLE progress(
    id SERIAL PRIMARY KEY,
    challenge_id INT,
    person_id INT,
    task_progress INT DEFAULT 0);

CREATE TABLE proof(
    id SERIAL PRIMARY KEY,
    challenge_id INT,
    person_id INT,
    proof_image BYTEA);

CREATE TABLE trophies(
    id SERIAL PRIMARY KEY,
    person_id INT,
    amount INT DEFAULT 0);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price INT,
    stock INT);

-- Create challenges
INSERT INTO challenge(title,max_progress) VALUES('Compost Challenge',7);

-- Create products
INSERT INTO products(title,price) VALUES('Luxury Watch',5);
INSERT INTO products(title,price) VALUES('Clothing',1);
INSERT INTO products(title,price) VALUES('Luxury Wallets',3);
INSERT INTO products(title,price) VALUES('Formal Shoes',3);
INSERT INTO products(title,price) VALUES('Perfume',2);
INSERT INTO products(title,price) VALUES('M4 IPad',10);