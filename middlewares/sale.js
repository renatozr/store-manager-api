const Joi = require('joi');

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

module.exports = {
  validateBody,
};