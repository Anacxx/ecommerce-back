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
