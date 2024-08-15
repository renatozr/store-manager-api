/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const productController = require('../../../controllers/product');
const productService = require('../../../services/product');

const { products, product } = require('../mocks/product');

const nonExistentId = 999;

describe('Product controller methods', function () {
  const req = {};
  const res = {};

  before(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();

    sinon.stub(productService, 'getAll');
    sinon.stub(productService, 'getById');
    sinon.stub(productService, 'create');
    sinon.stub(productService, 'update');
    sinon.stub(productService, 'exclude');
  });
  after(function () {
    productService.getAll.restore();
    productService.getById.restore();
    productService.create.restore();
    productService.update.restore();
    productService.exclude.restore();
  });

  describe('getAll', function () {
    it('responds status 200 and products json', async function () {
      productService.getAll.resolves(products);

      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(products)).to.be.true;

      productService.getAll.reset();
      res.status.resetHistory();
      res.json.resetHistory();
    });
  });

  describe('getById', function () {
    before(function () {
      productService.getById
        .onFirstCall().resolves(product)
        .onSecondCall().resolves(undefined);
    });
    after(function () { productService.getById.reset(); });

    afterEach(function () {
      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
    });

    it('if product exists, responds status 200 and product json', async function () {
      req.params = product.id;

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });

    it(
      'if product didn\'t exists, responds status 404 and not found error json',
      async function () {
      req.params = nonExistentId;

      await productController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Product not found' })).to.be.true;
    },
  );
  });

  describe('create', function () {
    it('responds status 201 and created product json', async function () {
      productService.create.resolves(product);
      req.body = { name: product.name, quantity: product.quantity };

      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;

      productService.create.reset();
      res.status.resetHistory();
      res.json.resetHistory();
      req.body = undefined;
    });
  });

  describe('update', function () {
    it('responds status 200 and updated product json', async function () {
      productService.update.resolves(product);
      req.params = product.id;
      req.body = { name: product.name, quantity: product.quantity };

      await productController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;

      productService.update.reset();
      res.status.resetHistory();
      res.json.resetHistory();
      req.params = undefined;
      req.body = undefined;
    });
  });

  describe('exclude', function () {
    it('responds status 204', async function () {
      productService.exclude.resolves();
      req.params = product.id;

      await productController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;

      productService.exclude.reset();
      res.status.resetHistory();
      res.end.resetHistory();
      req.params = undefined;
    });
  });
});
