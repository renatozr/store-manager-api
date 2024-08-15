const express = require('express');
const rescue = require('express-rescue');

const productController = require('../controllers/product');
const productMiddle = require('../middlewares/product');

const router = express.Router();

router.route('/')
  .post(
    productMiddle.validateBody,
    rescue(productMiddle.validateNameAlreadyExists),
    rescue(productController.create),
  )
  .get(rescue(productController.getAll));

router.route('/:id')
  .get(rescue(productController.getById))
  .put(
    productMiddle.validateBody,
    rescue(productMiddle.validateProductExists),
    rescue(productController.update),
  )
  .delete(
    rescue(productMiddle.validateProductExists),
    rescue(productController.exclude),
  );

module.exports = router;
