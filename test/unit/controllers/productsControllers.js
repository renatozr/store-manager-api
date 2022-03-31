const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../services/product');
const productController = require('../../../controllers/product');

const { products, product } = require('../mocks/product');
const nonexistentId = 999;

describe('Métodos de "productController"', () => {
  const req = {};
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();

    sinon.stub(productService, 'getAll');
    sinon.stub(productService, 'getById');
    sinon.stub(productService, 'create');
    sinon.stub(productService, 'update');
    sinon.stub(productService, 'exclude');
  });
  after(() => {
    productService.getAll.restore();
    productService.getById.restore();
    productService.create.restore();
    productService.update.restore();
    productService.exclude.restore();
  });

  describe('getAll', () => {

    before(() => { productService.getAll.resolves(products) });
    after(() => {
      productService.getAll.reset();

      res.status.resetHistory();
      res.json.resetHistory();
    });

    it('responde status 200 com o json dos produtos', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(products)).to.be.true;
    });
  });

  describe('getById', () => {

    before(() => {
      productService.getById
        .onFirstCall().resolves(product)
        .onSecondCall().resolves(undefined);
    });
    after(() => { productService.getById.reset() });

    afterEach(() => {
      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
    });

    it('caso o produto exista, responde status 200 com o json do produto', async () => {
      req.params = product.id;

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });

    it('caso o produto não exista, responde status 404 com o json { "message": "Product not found" }', async () => {
      req.params = nonexistentId;

      await productController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Product not found' })).to.be.true;
    });
  });

  describe('create', () => {

    before(() => {
      productService.create.resolves(product);

      req.body = { name: product.name, quantity: product.quantity };
    });
    after(() => {
      productService.create.reset();

      res.status.resetHistory();
      res.json.resetHistory();

      req.body = undefined;
    });

    it('responde status 201 com o json do produto criado', async () => {
      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });
  });

  describe('update', () => {

    before(() => {
      productService.update.resolves(product);

      req.params = product.id;
      req.body = { name: product.name, quantity: product.quantity };
    });
    after(() => {
      productService.update.reset();

      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
      req.body = undefined;
    });

    it('responde status 200 com o json do produto atualizado', async () => {
      await productController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
    });
  });

  describe('exclude', () => {

    before(() => {
      productService.exclude.resolves();

      req.params = product.id;
    });
    after(() => {
      productService.exclude.reset();

      res.status.resetHistory();
      res.end.resetHistory();

      req.params = undefined;
    });

    it('responde status 204 sem conteúdo', async () => {
      await productController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
    });
  });
});
