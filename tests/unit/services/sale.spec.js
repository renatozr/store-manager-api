/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const saleService = require('../../../services/sale');
const saleModel = require('../../../models/sale');
const productModel = require('../../../models/product');

const { sales, sale, createdSale, items, updatedSale } = require('../mocks/sale');

const saleId = 1;

describe('Sale service methods', function () {
  before(function () {
    sinon.stub(saleModel, 'getAll');
    sinon.stub(saleModel, 'getById');
    sinon.stub(saleModel, 'create');
    sinon.stub(saleModel, 'update');
    sinon.stub(saleModel, 'exclude');

    sinon.stub(productModel, 'updateQuantity');
  });

  after(function () {
    saleModel.getAll.restore();
    saleModel.getById.restore();
    saleModel.create.restore();
    saleModel.update.restore();
    saleModel.exclude.restore();

    productModel.updateQuantity.restore();
  });

  describe('getAll', function () {
    it('returns all sales', async function () {
      saleModel.getAll.resolves(sales);

      const response = await saleService.getAll();
      
      expect(response).to.be.equal(sales);

      saleModel.getAll.reset();
    });
  });

  describe('getById', function () {
    it('returns sale searched by id', async function () {
      saleModel.getById.resolves(sale);

      const response = await saleService.getById(saleId);
      
      expect(response).to.be.equal(sale);

      saleModel.getById.reset();
    });
  });

  describe('create', function () {
    it('returns created sale and updates product quantity', async function () {
      saleModel.create.resolves(createdSale);
      productModel.updateQuantity.resolves();

      const response = await saleService.create(items);
      
      expect(productModel.updateQuantity.calledOnce).to.be.true;
      expect(response).to.be.equal(createdSale);

      saleModel.create.reset();
      productModel.updateQuantity.reset();
    });
  });

  describe('update', function () {
    const { itemUpdated: [{ productId, quantity }] } = updatedSale;

    it('returns updated sale', async function () {
      saleModel.update.resolves(updatedSale);

      const response = await saleService.update(saleId, productId, quantity);
      
      expect(response).to.be.equal(updatedSale);

      saleModel.update.reset();
    });
  });

  describe('exclude', function () {
    it('excludes sale and updates product quantity', async function () {
      saleModel.exclude.resolves(items);
      productModel.updateQuantity.resolves();

      await saleService.exclude(saleId);
      
      expect(saleModel.exclude.calledOnce).to.be.true;
      expect(productModel.updateQuantity.calledOnce).to.be.true;

      saleModel.exclude.reset();
      productModel.updateQuantity.reset();
    });
  });
});
