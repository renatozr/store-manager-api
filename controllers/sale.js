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

module.exports = {
  getAll,
  getById,
};