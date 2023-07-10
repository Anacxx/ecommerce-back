-- Active: 1688999456276@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);
SELECT * FROM users;
INSERT INTO users(id, name, email, password, created_at)
    VALUES("a001","Ana Carolina",'ana@email.com','123abc',datetime('now'));
INSERT INTO users(id, name, email, password, created_at)
    VALUES("a002","Emily",'emily@email.com','a23df5',datetime('now'));
INSERT INTO users(id, name, email, password, created_at)
    VALUES("a003","Maristela",'maristela@email.com','gte54g',datetime('now'));

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_URL TEXT NOT NULL
);

SELECT * FROM products;
INSERT INTO products (id, name, price, description, image_url)
    VALUES('prod001','Chocolate amargo', 8.5,"Chocolate 70% de cacau","https...");
INSERT INTO products (id, name, price, description, image_url)
    VALUES('prod002','Bala de café', 0.25,"Bala de café","httpsdfd...");
INSERT INTO products (id, name, price, description, image_url)
    VALUES('prod003','Iogurte', 2.95,"Iogurte de laranja e cenoura","http...");
INSERT INTO products (id, name, price, description, image_url)
    VALUES('prod004','Atum', 6.99,"Atum conservado em água","http...");
INSERT INTO products (id, name, price, description, image_url)
    VALUES('prod005','Brioche', 3.95,"Brioche recheado com Nutella","httpfds...");