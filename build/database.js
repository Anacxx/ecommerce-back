"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
exports.users = [
    {
        id: '001',
        name: 'Ana',
        email: 'ana@email.com',
        password: 'blabla123',
        createdAt: new Date().toISOString(),
    }, {
        id: '002',
        name: 'Emily',
        email: 'emily@email.com',
        password: 'bla123',
        createdAt: new Date().toISOString(),
    }
];
function createUser(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: '0034',
        name: 'Bala',
        price: 0.5,
        description: 'Bala de café',
        imageUrl: 'https...',
    }, {
        id: '0036',
        name: 'Chocolate',
        price: 6.00,
        description: 'Chocolate 70% de cacau',
        imageUrl: 'https..',
    }
];
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return 'Produto criado com sucesso!';
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(name) {
    const searchTerm = name.toLowerCase();
    const matchingProducts = exports.products.filter((product) => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchTerm);
    });
    return matchingProducts;
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map