require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const app = express();
const models = require('./app/models');
app.use(express.json()); //recepcao de dados em JSON
//cors:
app.use(
  cors({
    origin: '*',
  })
);
//BANCO DE DADOS
//teste de conexao
// try {
//   models.sequelize.authenticate();
//   console.log('conexao realizada com sucesso');
// } catch (error) {
//   console.log('erro de conexao com BD', error);
// }
models.sequelize
  .sync() //{ force: true }
  .then(() => {
    console.log('sincronizando com banco de dados');
  })
  .catch((error) => {
    console.log('erro ao sincronizar com bd', error.message);
  });

//ROTAS
app.get('/', (request, response) => {
  return response.status(200).json({
    message: 'Loja API',
    version: '1.0',
  });
});
const produtoRotas = require('./app/routes/produto.routes.js');
const clienteRotas = require('./app/routes/cliente.routes.js');
app.use(produtoRotas);
app.use(clienteRotas);

app.listen(config.port, () => {
  console.log('servidor on-line');
});
