import { getAllProducts, getAllUsers, users } from "./database";
import { createUser } from "./database";
import { createProduct } from "./database";
import { searchProductsByName } from "./database";
// console.log('O aplicativo foi iniciado,tudo certo.')
// console.log(createUser('001','Ana Carolina', 'ana@gmail.com', '123443'))
// console.log(getAllUsers())
console.log(createProduct('0323','Acido Retinóico',40.00,'Ácido para tirar a oleosidade','http...'))
console.log('parte2')
console.log(searchProductsByName('Chocolate'))
console.log('parte3')
console.log(getAllProducts())
