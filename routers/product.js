const express = require('express');
const rescue = require('express-rescue');

const productController = require('../controllers/product');

const router = express.Router();

router.route('/')
  .post()
  .get(rescue(productController.getAll));

router.route('/:id')
  .get(rescue(productController.getById))
  .put()
  .delete();

module.exports = router;