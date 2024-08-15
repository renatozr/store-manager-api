const saleService = require('../services/sale');

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.getById(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const items = [...req.body];

  const createdSale = await saleService.create(items);

  return res.status(201).json(createdSale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;

  const updatedSale = await saleService.update(id, productId, quantity);

  return res.status(200).json(updatedSale);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  await saleService.exclude(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
