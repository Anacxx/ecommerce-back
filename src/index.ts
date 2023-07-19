import { getAllProducts, getAllUsers, users, products } from "./database";
import { createUser } from "./database";
import { createProduct } from "./database";
import { searchProductsByName } from "./database";
import express from 'express';
import { Request, Response } from "express";
import cors from 'cors';
import { Tuser, Tproduct } from "./types";
import { db } from './database/knex';
import { error } from "console";


const app = express()
app.use(express.json())
app.use(cors())
app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
// Get All Users (Com query builder)
app.get('/users', async (req: Request, res: Response) => {
    try {
        // const users = await db.raw(`
        //     SELECT * FROM users;
        // `)
        const users = await db("users")
        res.status(200).send(users)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})

// Get Products with Optional Name Filter -FALTA QUERY BUILDER
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

//Create User (Com query builder)
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
        const [userExist] = await db("users").where({id : id})

        if (userExist) {
            res.status(400)
            throw new Error('Já existe uma conta com essa ID.');
        }else{
            await db.insert({
                id:id,
                name:name,
                email:email,
                password: password,
                created_at: createdAt
            }).into("users")
        }
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
});

//Create Product (Com query builder)
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
        // verificar se o produto existe
        const [productExist] = await db("products").where({id : id})

        if (productExist) {
            res.status(400)
            throw new Error('Já existe um produto com essa ID.');
        }
        if (price <= 0) {
            res.status(400)
            throw new Error('O preço deve ser um valor positivo.');
        }
        // await db.raw(`
        //     INSERT INTO products (id,name,price,description,image_URL)
        //     VALUES ('${id}','${name}','${price}','${description}','${imageUrl}');
        // `)
        await db.insert({
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: imageUrl
        }).into("products")

        res.status(201).send('Produto cadastrado com sucesso!');

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
});

//Delete User by ID (Com query builder)
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [userToDelete] = await db("users").where({id: idToDelete})

        if (userToDelete) {
            await db.del().from("users").where({id: idToDelete})
        } else {
            res.status(404)
            throw new Error('Id inválida.')
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
//Delete Product by ID - (Com query builder)
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [productToDelete] = await db("products").where({id: idToDelete})
        
        if (productToDelete) {
            await db.del().from("products").where({id:idToDelete})
        } else {
            res.status(404)
            throw new Error('Para deletar algum produto, a ID precisa ser válida!')
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

//Edit Product by ID -FALTA QUERY BUILDER
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

// Delete Purchase by ID (Com query builder)
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        //procurar o id pra deletar 

        const [purToDelete] = await db("purchases").where({id: idToDelete})

        if(purToDelete){

            await db.del().from("purchases").where({id: idToDelete})

        }else{
            res.status(404)
            throw new Error('Para deletar alguma compra, a ID precisa ser válida!')
        }
        res.status(200).send("Compra deletada com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Create purchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const products = req.body.products
        if(typeof id !== 'string'){
            res.status(400)
            throw new Error("A Id precisa ser string")
        }
        if(typeof buyer !== 'string'){
            res.status(400)
            throw new Error("O buyer precisa ser string")
        }
        const [purchase] = await db('purchases').where({id})
        if(purchase){
            res.status(400)
            throw new Error("A Purchase já existe")
        }
        const resultProducts = []
        let totalPrice = 0
        for(let prod of products){
            const [product] = await db('products').where({id: prod.id})
            if(!product){
                res.status(400)
                throw new Error(`${prod.id} não encontrado`)
            }
            resultProducts.push({...product, quantity: prod.quantity})
        }
        for(let product of resultProducts){
            totalPrice += product.price * product.quantity
        }
        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice,
            created_at: new Date().toISOString()
        }
        await db('purchases').insert(newPurchase)

        for(let product of products){
            const newPurchaseProducts = {
                purchase_id:id,
                product_id:product.id,
                quantity: product.quantity
            }
            await db('purchases_products').insert(newPurchaseProducts)
        }
        
        res.status(201).send("Pedido realizado com sucesso")
  
    } catch (error:any) {
                console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// Get Purchase By ID
// app.get("/purchases/:id", async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;
//         if (typeof id !== 'string') {
//             res.status(400);
//             throw new Error("Id precisa ser uma string");
//         }

//         const purchase = await db('purchases').where({ id });

//         if (!purchase) {
//             res.status(404);
//             throw new Error("Compra não encontrada");
//         }

//         const products = await db('purchases_products')
//             .where({ purchase_id: id })
//             .join('products', 'purchases_products.product_id', '=', 'products.id')
//             .select('products.*', 'purchases_products.quantity as quantity');
//             const result = await db.raw(`
//                 SELECT
//                 purchases.id AS purchaseId,
//                 purchases.buyer AS buyerId,
//                 users.name AS bandId,
//                 users.email AS bandName,
//                 purchases.created_at
//                 FROM purchases
//                 INNER JOIN users
//                 ON purchases.buyer = users.id;
//           `)
//         res.status(200).send({ ...purchase, products });

//     } catch (error) {
//         console.log(error);

//         if (res.statusCode === 200) {
//             res.status(500);
//         }

//         if (error instanceof Error) {
//             res.send(error.message);
//         } else {
//             res.send("Erro inesperado");
//         }
//     }
// });


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (typeof id !== 'string') {
            res.status(400);
            throw new Error("Id precisa ser uma string");
        }

        const purchase = await db('purchases')
            .where({ id })
            .first();

        if (!purchase) {
            res.status(404);
            throw new Error("Compra não encontrada");
        }

        const products = await db('purchases_products')
            .where({ purchase_id: id })
            .join('products', 'purchases_products.product_id', '=', 'products.id')
            .select('products.*', 'purchases_products.quantity as quantity');

        const buyer = await db('users')
            .where({ id: purchase.buyer })
            .first();

        if (!buyer) {
            res.status(404);
            throw new Error("Comprador não encontrado");
        }

        const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

        const formattedOutput = {
            purchaseId: purchase.id,
            buyerId: purchase.buyer,
            buyerName: buyer.name,
            buyerEmail: buyer.email,
            totalPrice: totalPrice,
            createdAt: purchase.created_at,
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                imageUrl: product.imageUrl,
                quantity: product.quantity
            }))
        };

        res.status(200).json(formattedOutput);

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
});
