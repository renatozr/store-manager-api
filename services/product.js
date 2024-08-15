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
  const createdProduct = await productModel.create(name, quantity);

  return createdProduct;
};

const update = async (id, name, quantity) => {
  const updatedProduct = await productModel.update(id, name, quantity);

  return updatedProduct;
};

const exclude = async (id) => {
  await productModel.exclude(id);
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  exclude,
};
