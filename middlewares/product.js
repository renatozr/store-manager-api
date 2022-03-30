const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateBody = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate({ name, quantity });

  if (error) return next(error);

  return next();
};

module.exports = {
  validateBody,
};