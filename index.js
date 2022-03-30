require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./routers/product');
const saleRouter = require('./routers/sale');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/products', productRouter);

app.use('/sales', saleRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
