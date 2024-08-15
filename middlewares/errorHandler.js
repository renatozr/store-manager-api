const Joi = require('joi');

const errorHandler = (err, _req, res, _next) => {
  if (Joi.isError(err)) {
    const status = err.message.includes('required') ? 400 : 422;

    return res.status(status).json({ message: err.message });
  }
  
  return res.status(err.status || 500).json({ message: err.message, error: err });
};

module.exports = errorHandler;
