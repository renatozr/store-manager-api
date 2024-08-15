const Joi = require('joi');
const saleService = require('../services/sale');
const productService = require('../services/product');

const itemSchema = Joi.object({
  productId: Joi.number().required(),
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

const validateProductsAvailability = async (req, res, next) => {
  const [{ productId, quantity }] = req.body;

  const product = await productService.getById(productId);

  if (quantity > product.quantity) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }

  return next();
};

module.exports = {
  validateBody,
  validateSaleExists,
  validateProductsAvailability,
};
