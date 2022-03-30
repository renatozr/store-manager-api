const productModel = require('../models/product');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

module.exports = {
  getAll,
  getById,
};