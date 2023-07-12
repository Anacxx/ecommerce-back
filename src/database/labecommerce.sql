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

---Get All Users
SELECT * FROM users;

---Get All Products (funcionalidade 1)
SELECT * FROM products;

--Get all Products (funcionalidade 2 procurando por um produto específico)
SELECT * FROM products
WHERE name like '%Atum%' ;

--Create User
INSERT INTO users (id, name, email, password, created_at)
VALUES("a0099","Maria Clara","mar_clara@gmail.com","434f5tg",datetime('now'));

--Create Product
INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod007","Mouse sem fio", 50.00 ,"Mouse sem fio ultra power","httpdfdsfsd");

--Delete User by id
DELETE FROM users
WHERE id = "a001";

--Delete Product by id
DELETE FROM products
WHERE id = "prod007";

--Edit Product by id
UPDATE products
SET description = 'Atum conservado em óleo'
WHERE id = 'prod004';

--Faça a query editar todas as colunas do item -- Products
UPDATE products
SET name = 'Brioche de nutella',
    price = 4.00, 
    description = 'Brioche de leite ninho e nutella',
    image_url = 'httpsgfdgdfg'
where id  = 'prod005';

 select * from products;

  --Faça a query editar todas as colunas do item--Users
UPDATE users
SET name = 'Maristela Paula',
    email = 'maristelac@gmail.com',
    password = '123456',
    created_at = datetime('now')

where id  = 'a003';

 select * from users;


--purchases é pedido, entao essa e´a tabela de pedidos

-- relaçao de 1/1 com FK

CREATE TABLE purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

SELECT * FROM purchases;

--a chave estrangeira (FK) será a coluna buyer e irá referenciar a coluna id da tabela users

INSERT INTO purchases (id, buyer, total_price, created_at)
    VALUES('p001','a002',500,datetime('now'));

INSERT INTO purchases (id, buyer, total_price, created_at)
    VALUES('p002','a003',345,datetime('now'));

UPDATE purchases
SET total_price = 400
where id  = 'p001';

-- junção de users com purchases

SELECT
purchases.id,
purchases.buyer,
users.name,
users.email,
purchases.total_price,
purchases.created_at
FROM users
INNER JOIN purchases
ON purchases.buyer = users.id;
