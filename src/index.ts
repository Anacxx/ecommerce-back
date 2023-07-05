import { getAllProducts, getAllUsers, users,products} from "./database";
import { createUser } from "./database";
import { createProduct } from "./database";
import { searchProductsByName } from "./database";
import express from 'express';
import { Request, Response } from "express";
import cors from 'cors';
import { Tuser, Tproduct } from "./types";

// console.log('O aplicativo foi iniciado,tudo certo.')
// console.log(createUser('001','Ana Carolina', 'ana@gmail.com', '123443'))
// console.log(getAllUsers())
//console.log(createProduct('0323','Acido Retinóico',40.00,'Ácido para tirar a oleosidade','http...'))
//console.log('parte2')
//console.log(searchProductsByName('Chocolate'))
//console.log('parte3')
//console.log(getAllProducts())
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
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message)
    }
})

// Get All Products ou produto específico.
app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        if(name !== undefined){
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
            if(name.length > 0){
                res.status(200).send(filteredProducts)
            }else{
                res.status(400)
                throw new Error('É necessário fornecer o nome do produto para a busca ser efetuada!');
            }
        }else{
            res.status(200).send(products);
        }    

    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message) 
    }
})
// //Create User
app.post('/users', (req: Request, res: Response) => {
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
  
    const existingIdUser = users.find(user => user.id === id);
    if (existingIdUser) {
      res.status(400)
      throw new Error('Já existe uma conta com essa ID.');
    }
  
    const existingEmailUser = users.find(user => user.email === email);
    if (existingEmailUser) {
      res.status(400)
      throw new Error('Já existe uma conta com esse e-mail.');
    }
  
    const newUser: Tuser = {
      id,
      name,
      email,
      password,
      createdAt
    };
  
    users.push(newUser);
    res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message) 
    }
  });

//Create Product
app.post('/products', (req: Request, res: Response) => {
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
  
    const existingProduct = products.find(product => product.id === id);
    if (existingProduct) {
      res.status(409)
      throw new Error('Já existe um produto com essa ID.');
    }
  
    if (price <= 0) {
      res.status(400)
      throw new Error('O preço deve ser um valor positivo.');
    }
  
    const newProduct: Tproduct = {
      id,
      name,
      price,
      description,
      imageUrl
    };
  
    products.push(newProduct);
    res.status(201).send('Produto cadastrado com sucesso!');
} catch (error:any) {
    if(res.statusCode === 200){
        res.status(500)
    }
    console.log(error)
    res.send(error.message) 
}
  });
//Delete User by ID
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const accountIndex = users.findIndex((user) => user.id === idToDelete)
        if(accountIndex < 0){
            res.status(400)
            throw new Error('Id inválida.')
        }else{
            users.splice(accountIndex,1)
        }
        res.status(200).send("User apagado com sucesso!")
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message) 
    }
})
//Delete Product by ID
app.delete("/products/:id",(req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const productIndex = products.findIndex((product) => product.id === idToDelete)
        if(productIndex < 0){
            res.status(400)
            throw new Error('Para deletar algum produto, a ID precisa ser válida!')
        }else{
            products.splice(productIndex,1)
        }
        res.status(200).send("Produto deletado com sucesso!")
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message) 
    }
})
//Edit Product by ID
app.put("/products/:id", (req: Request, res: Response) =>{
    try {
        const idToModify = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined
    
        const product = products.find((product) => product.id === idToModify)
        if (!product){
            res.status(404)
            throw new Error("Produto não encontrado, por isso não foi atualizado.");
        }else{
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.description = newDescription || product.description
            product.imageUrl = newImageUrl || product.imageUrl
            product.price = isNaN(Number(newPrice))? product.price : newPrice as number
        }
        res.status(200).send("Produto atualizado com sucesso!")
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        console.log(error)
        res.send(error.message) 
    }
})
