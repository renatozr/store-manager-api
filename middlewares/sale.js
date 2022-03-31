const Joi = require('joi');
const saleService = require('../services/sale');

const itemSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateBody = (req, _res, next) => {
  const [{ productId, quantity }] = req.body;

  const { error } = itemSchema.validate({ productId, quantity });

  if (error) return next(error);

  return next();
};

const validateSaleExists = async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleService.getById(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  return next();
};

module.exports = {
  validateBody,
  validateSaleExists,
};