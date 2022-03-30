const productModel = require('../models/product');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

const getByName = async (name) => {
  const product = await productModel.getByName(name);

  return product;
};

const create = async (name, quantity) => {
  const product = await productModel.create(name, quantity);

  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};