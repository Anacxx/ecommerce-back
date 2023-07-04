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
    res.status(200).send(users)
})
// Get All Products ou produto específico.
app.get('/products', (req: Request, res: Response) => {
    const name = req.query.name as string
    if(name !== undefined){
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        res.status(200).send(filteredProducts)
    }else{
        res.status(200).send(products)
    }    

})
//Create User
app.post('/users',(req: Request, res: Response) => {
       const id = req.body.id as string
       const name =  req.body.name as string
       const email =  req.body.email as string
       const password = req.body.password as string
       const createdAt = new Date().toISOString() as string
       const newUser:Tuser = {
        id,
        name,
        email,
        password,
        createdAt
       }
       users.push(newUser)
       res.status(201).send('Usuário cadastrado com sucesso!')
})
//Create Product
app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string
    const newProduct:Tproduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }   
    products.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso!')
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id
    const accountIndex = users.findIndex((user) => user.id === idToDelete)
    if(accountIndex >= 0){
        users.splice(accountIndex,1)
    }
    res.status(200).send("User apagado com sucesso!")
})
app.delete("/products/:id",(req: Request, res: Response) => {
    const idToDelete = req.params.id
    const productIndex = products.findIndex((product) => product.id === idToDelete)
    if(productIndex >= 0){
        products.splice(productIndex,1)
    }
    res.status(200).send("Produto apagado com sucesso!")
})
app.put("/products/:id", (req: Request, res: Response) =>{
    const idToModify = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number 
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => product.id === idToModify)
    if (product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizado com sucesso!")
})
