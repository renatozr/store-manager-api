const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../services/product');
const productModel = require('../../../models/product');

const { products, product } = require('../mocks/product');

describe('Product service methods', function () {
  before(function () {
    sinon.stub(productModel, 'getAll');
    sinon.stub(productModel, 'getById');
    sinon.stub(productModel, 'getByName');
    sinon.stub(productModel, 'create');
    sinon.stub(productModel, 'update');
    sinon.stub(productModel, 'exclude');
  });

  after(function () {
    productModel.getAll.restore();
    productModel.getById.restore();
    productModel.getByName.restore();
    productModel.create.restore();
    productModel.update.restore();
    productModel.exclude.restore();
  });

  describe('getAll', function () {
    it('returns all products', async function () {
      productModel.getAll.resolves(products);

      const response = await productService.getAll();
      
      expect(response).to.be.equal(products);

      productModel.getAll.reset();
    });
  });

  describe('getById', function () {
    it('returns product searched by id', async function () {
      productModel.getById.resolves(product);

      const response = await productService.getById(product.id);
      
      expect(response).to.be.equal(product);

      productModel.getById.reset();
    });
  });

  describe('getByName', function () {
    it('returns product searched by name', async function () {
      productModel.getByName.resolves(product);

      const response = await productService.getByName(product.name);
      
      expect(response).to.be.equal(product);

      productModel.getByName.reset();
    });
  });

  describe('create', function () {
    it('returns created product', async function () {
      productModel.create.resolves(product);

      const response = await productService.create(product.name, product.quantity);
      
      expect(response).to.be.equal(product);

      productModel.create.reset();
    });
  });

  describe('update', function () {
    it('returns updated product', async function () {
      productModel.update.resolves(product);

      const response = await productService.update(product.id, product.name, product.quantity);
      
      expect(response).to.be.equal(product);

      productModel.update.reset();
    });
  });

  describe('exclude', function () {
    it('excludes product', async function () {
      productModel.exclude.resolves();

      await productService.exclude(product.id);
      
      // eslint-disable-next-line no-unused-expressions
      expect(productModel.exclude.calledOnce).to.be.true;

      productModel.exclude.reset();
    });
  });
});
