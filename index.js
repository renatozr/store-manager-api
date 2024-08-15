require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./routers/product');
const saleRouter = require('./routers/sale');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
