const saleModel = require('../models/sale');
const productModel = require('../models/product');

const getAll = async () => {
  const sales = await saleModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);

  return sale;
};

const create = async (items) => {
  const sale = await saleModel.create(items);

  await productModel.updateQuantity(items, 'created');

  return sale;
};

const update = async (saleId, productId, quantity) => {
  const item = await saleModel.update(saleId, productId, quantity);

  return item;
};

const exclude = async (id) => {
  const items = await saleModel.exclude(id);

  await productModel.updateQuantity(items, 'deleted');
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};