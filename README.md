# ecommerce-back

API de Gerenciamento de Compras

Esta é uma API que oferece funcionalidades para gerenciamento de compras de produtos. Com ela, é possível criar, editar, buscar e excluir compras, bem como adicionar, buscar e remover usuários e produtos.

Endpoints Principais

GET /users: Obtém uma lista de todos os usuários cadastrados.

POST /users: Cria um novo usuário com os campos obrigatórios (id, name, email, password).

DELETE /users/:id: Remove um usuário específico com base no ID fornecido.

GET /products: Obtém uma lista de todos os produtos cadastrados. Também permite filtrar produtos pelo nome usando o parâmetro de consulta "name".

POST /products: Cria um novo produto com os campos obrigatórios (id, name, price, description, imageUrl).

DELETE /products/:id: Remove um produto específico com base no ID fornecido.

PUT /products/:id: Atualiza os dados de um produto específico com base no ID fornecido.

GET /purchases/:id: Obtém informações detalhadas sobre uma compra específica com base no ID fornecido.

POST /purchases: Cria uma nova compra com os campos obrigatórios (id, buyer, products).

DELETE /purchases/:id: Remove uma compra específica com base no ID fornecido.


Documentação 
https://documenter.getpostman.com/view/27709298/2s93zFVyNr