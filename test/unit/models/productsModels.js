const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/product');

const {
  dbProducts,
  products,
  dbProduct,
  product,
  items,
} = require('../mocks/product');

describe('Métodos de "productModel"', () => {

  before(() => { sinon.stub(connection, 'execute') });
  after(() => { connection.execute.restore() });

  describe('getAll', () => {

    before(() => { connection.execute.resolves(dbProducts) });
    after(() => { connection.execute.reset() });

    it('retorna todos os produtos do banco de dados', async () => {
      const response = await productModel.getAll();

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(products);
    });
  });

  describe('getById', () => {

    before(() => { connection.execute.resolves(dbProduct) });
    after(() => { connection.execute.reset() });

    it('retorna o produto buscado por "id" no banco de dados', async () => {
      const response = await productModel.getById(product.id);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);
    });
  });

  describe('getByName', () => {

    before(() => { connection.execute.resolves(dbProduct) });
    after(() => { connection.execute.reset() });

    it('retorna o produto buscado por "name" no banco de dados', async () => {
      const response = await productModel.getByName(product.name);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);
    });
  });

  describe('create', () => {

    before(() => { connection.execute.resolves([{ insertId: product.id }]) });
    after(() => { connection.execute.reset() });

    it('retorna o produto criado no banco de dados', async () => {
      const response = await productModel.create(product.name, product.quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);
    });
  });

  describe('update', () => {

    before(() => { connection.execute.resolves() });
    after(() => { connection.execute.reset() });

    it('retorna o produto atualizado no banco de dados', async () => {
      const response = await productModel.update(product.id, product.name, product.quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);
    });
  });

  describe('updateQuantity', () => {

    before(() => { connection.execute.resolves() });
    after(() => { connection.execute.reset() });

    it('atualiza a quantidade dos produtos no banco de dados', async () => {
      await productModel.updateQuantity(items, 'created');

      expect(connection.execute.callCount).to.be.equal(items.length);
    });
  });

  describe('exclude', () => {

    before(() => { connection.execute.resolves() });
    after(() => { connection.execute.reset() });

    it('deleta o produto no banco de dados', async () => {
      await productModel.exclude(product.id);

      expect(connection.execute.calledOnce).to.be.true;
    });
  });
});
