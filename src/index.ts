import { getAllProducts, getAllUsers, users, products } from "./database";
import { createUser } from "./database";
import { createProduct } from "./database";
import { searchProductsByName } from "./database";
import express from 'express';
import { Request, Response } from "express";
import cors from 'cors';
import { Tuser, Tproduct } from "./types";
import { db } from './database/knex';


const app = express()
app.use(express.json())
app.use(cors())
app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
// Get All Users 
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await db.raw(`
            SELECT * FROM users;
        `)
        res.status(200).send(users)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})

// Get Products with Optional Name Filter
app.get('/products', async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        let query = `
            SELECT * FROM products;
        `;
        if (name && typeof name === 'string') {
            query = `
                SELECT * FROM products
                WHERE name LIKE '%${name}%';
            `;
        }
        const products = await db.raw(query);
        res.status(200).send(products);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

//Create User
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const createdAt = new Date().toISOString() as string;

        if (typeof id !== 'string' || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            res.status(400)
            throw new Error('Todos os campos devem ser do tipo string.');
        }

        if (!id || !name || !email || !password) {
            res.status(400)
            throw new Error('Todos os campos são obrigatórios.');
        }

        const [userExist] = await db.raw(`
            SELECT * FROM users
            WHERE id = '${id}' OR email = '${email}';
        `);
        if (userExist) {
            res.status(400)
            throw new Error('Já existe uma conta com essa ID.');
        }
        await db.raw(`
            INSERT INTO users (id,name,email,password,created_at)
            VALUES ('${id}','${name}','${email}','${password}','${createdAt}');
        `)
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
});

//Create Product
app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const name = req.body.name as string;
        const price = req.body.price as number;
        const description = req.body.description as string;
        const imageUrl = req.body.imageUrl as string;

        if (!id || !name || !price || !description || !imageUrl) {
            res.status(400)
            throw new Error('Todos os campos são obrigatórios.');
        }

        if (
            typeof id !== 'string' ||
            typeof name !== 'string' ||
            typeof price !== 'number' ||
            typeof description !== 'string' ||
            typeof imageUrl !== 'string'
        ) {
            res.status(400)
            throw new Error('Tipos de dados inválidos.');
        }

        const [productExist] = await db.raw(`
            SELECT * FROM products
            WHERE id = '${id}';
        `);
        if (productExist) {
            res.status(400)
            throw new Error('Já existe um produto com essa ID.');
        }
        if (price <= 0) {
            res.status(400)
            throw new Error('O preço deve ser um valor positivo.');
        }
        await db.raw(`
            INSERT INTO products (id,name,price,description,image_URL)
            VALUES ('${id}','${name}','${price}','${description}','${imageUrl}');
        `)

        res.status(201).send('Produto cadastrado com sucesso!');
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
});

// // Rota para criar um novo pedido
// app.post("/purchases", async (req: Request, res: Response) => {
//   try {
//     // Verifica se todas as propriedades esperadas existem no corpo da requisição
//     if (
//       typeof req.body.id !== "string" ||
//       typeof req.body.buyer !== "string" ||
//       typeof req.body.totalPrice !== "number"
//     ) {
//       throw new Error("Dados incompletos do produto");
//     }

//     // Extraindo as propriedades do corpo da requisição
//     const id = req.body.id as string;
//     cons

//Delete User by ID
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const accountIndex = users.findIndex((user) => user.id === idToDelete)
        if (accountIndex < 0) {
            res.status(400)
            throw new Error('Id inválida.')
        } else {
            users.splice(accountIndex, 1)
        }
        res.status(200).send("User apagado com sucesso!")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})
//Delete Product by ID
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const productIndex = products.findIndex((product) => product.id === idToDelete)
        if (productIndex < 0) {
            res.status(400)
            throw new Error('Para deletar algum produto, a ID precisa ser válida!')
        } else {
            products.splice(productIndex, 1)
        }
        res.status(200).send("Produto deletado com sucesso!")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})

//Edit Product by ID
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToModify = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined


        const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = '${idToModify}';
    `)
    if(product){
        await db.raw(`
        UPDATE products
        SET 
            id = "${newId || product.id}",
            name = "${newName || product.name}",
            price = "${newPrice || product.price}",
            description = "${newDescription || product.description}",
            image_url = "${newImageUrl || product.image_url}"
        WHERE 
            id = "${idToModify}"
        `)
    }else{
        res.status(404)
        throw new Error("Produto não encontrado, por isso não foi atualizado.");
    }
        res.status(200).send("Produto atualizado com sucesso!")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})

// Delete Purchase by ID TUDO ERRADO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const purchaseToDelete = req.params.id
        if(purchaseToDelete){
            await db.raw(`
            DELETE FROM purchases
            WHERE id = "${purchaseToDelete}";
            `)
        }else{
            res.status(400)
            throw new Error('Para deletar alguma compra, a ID precisa ser válida!')
        }
        res.status(200).send("Compra deletada com sucesso!")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})
