const express = require('express');
const rescue = require('express-rescue');

const saleController = require('../controllers/sale');
const saleMiddle = require('../middlewares/sale');

const router = express.Router();

router.route('/')
  .post(
    saleMiddle.validateBody,
    rescue(saleMiddle.validateProductsAvailability),
    rescue(saleController.create),
  )
  .get(rescue(saleController.getAll));

router.route('/:id')
  .get(rescue(saleController.getById))
  .put(
    saleMiddle.validateBody,
    rescue(saleController.update),
  )
  .delete(
    rescue(saleMiddle.validateSaleExists),
    rescue(saleController.exclude),
  );

module.exports = router;
