const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/product');
const productService = require('../../../services/product');

const { products, product } = require('../mocks/product');

describe('Métodos de "productService"', () => {
  
  before(() => {
    sinon.stub(productModel, 'getAll');
    sinon.stub(productModel, 'getById');
    sinon.stub(productModel, 'getByName');
    sinon.stub(productModel, 'create');
    sinon.stub(productModel, 'update');
    sinon.stub(productModel, 'exclude');
  });

  after(() => {
    productModel.getAll.restore();
    productModel.getById.restore();
    productModel.getByName.restore();
    productModel.create.restore();
    productModel.update.restore();
    productModel.exclude.restore();
  });

  describe('getAll', () => {
    
    before(() => { productModel.getAll.resolves(products) });
    after(() => { productModel.getAll.reset() });

    it('retorna todos os produtos', async () => {
      const response = await productService.getAll();
      
      expect(response).to.be.equal(products);
    });
  });

  describe('getById', () => {
    
    before(() => { productModel.getById.resolves(product) });
    after(() => { productModel.getById.reset() });

    it('retorna o produto buscado por "id"', async () => {
      const response = await productService.getById(product.id);
      
      expect(response).to.be.equal(product);
    });
  });

  describe('getByName', () => {
    
    before(() => { productModel.getByName.resolves(product) });
    after(() => { productModel.getByName.reset() });

    it('retorna o produto buscado por "name"', async () => {
      const response = await productService.getByName(product.name);
      
      expect(response).to.be.equal(product);
    });
  });

    describe('create', () => {
    
    before(() => { productModel.create.resolves(product) });
    after(() => { productModel.create.reset() });

    it('retorna o produto criado', async () => {
      const response = await productService.create(product.name, product.quantity);
      
      expect(response).to.be.equal(product);
    });
  });

  describe('update', () => {
    
    before(() => { productModel.update.resolves(product) });
    after(() => { productModel.update.reset() });

    it('retorna o produto atualizado', async () => {
      const response = await productService.update(product.id, product.name, product.quantity);
      
      expect(response).to.be.equal(product);
    });
  });

  describe('exclude', () => {
    
    before(() => { productModel.exclude.resolves() });
    after(() => { productModel.exclude.reset() });

    it('exclui o produto', async () => {
      await productService.exclude(product.id);
      
      expect(productModel.exclude.calledOnce).to.be.true;
    });
  });
});
