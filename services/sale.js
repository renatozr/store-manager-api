const saleModel = require('../models/sale');

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

  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
};