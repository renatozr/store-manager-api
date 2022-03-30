const express = require('express');
const rescue = require('express-rescue');

const saleController = require('../controllers/sale');
const saleMiddle = require('../middlewares/sale');

const router = express.Router();

router.route('/')
  .post(saleMiddle.validateBody)
  .get(rescue(saleController.getAll));

router.route('/:id')
  .get(rescue(saleController.getById))
  .put(saleMiddle.validateBody)
  .delete();

module.exports = router;