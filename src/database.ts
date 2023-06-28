import { Tuser } from "./types"
import { Tproduct } from "./types"

    export const users:Tuser[] = [
    {
        id: '001',
        name: 'Ana',
        email: 'ana@email.com',
        password: 'blabla123',
        createdAt: new Date().toISOString(),
    },{
        id: '002',
        name: 'Emily',
        email: 'emily@email.com',
        password: 'bla123',
        createdAt: new Date().toISOString(),
    }
    ]
    export function createUser(id: string, name: string, email: string, password: string): string {
        const createdAt = new Date().toISOString();
        const newUser: Tuser = { id, name, email, password, createdAt };
        users.push(newUser);
        return "Cadastro realizado com sucesso";
    }

    export function getAllUsers(): Tuser[] {
        return users;
    }

    export const products:Tproduct[] = [
        {
            id: '0034',
            name: 'Bala',
            price: 0.5,
            description: 'Bala de café',
            imageUrl: 'https...',
        },{
            id: '0036',
            name: 'Chocolate',
            price: 6.00,
            description: 'Chocolate 70% de cacau',
            imageUrl: 'https..',
        }
        ]
    export function createProduct(id:string, name:string, price:number, description:string,imageUrl:string){
        const newProduct: Tproduct = { id, name, price, description, imageUrl };
        products.push(newProduct)
        return 'Produto criado com sucesso!'
    }
    export function getAllProducts():Tproduct[]{
        return products
    }

    export function searchProductsByName(name:string):Tproduct[] {
        const searchTerm = name.toLowerCase();
        const matchingProducts = products.filter((product) => {
            const productName = product.name.toLowerCase();
            return productName.includes(searchTerm);
        });
        
        return matchingProducts;
        }