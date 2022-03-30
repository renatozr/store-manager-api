const express = require('express');
const rescue = require('express-rescue');

const saleController = require('../controllers/sale');

const router = express.Router();

router.route('/')
  .post()
  .get(rescue(saleController.getAll));

router.route('/:id')
  .get(rescue(saleController.getById))
  .put()
  .delete();

module.exports = router;