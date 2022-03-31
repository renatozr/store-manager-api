const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const saleModel = require('../../../models/sale');

const {
  dbSales,
  sales,
  dbSale,
  sale,
  createdSale,
  updatedSale,
  dbItems,
  items,
} = require('../mocks/sale');
const saleId = 1;
const nonexistentSaleId = 999;

describe('Métodos de "saleModel"', () => {

  before(() => { sinon.stub(connection, 'execute') });
  after(() => { connection.execute.restore() });

  describe('getAll', () => {

    before(() => { connection.execute.resolves(dbSales) });
    after(() => { connection.execute.reset() });

    it('retorna todas as vendas do banco de dados', async () => {
      const response = await saleModel.getAll();

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(sales);
    });
  });

  describe('getById', () => {

    before(() => {
      connection.execute
        .onFirstCall().resolves(dbSale)
        .onSecondCall().resolves([[]]);
    });
    after(() => { connection.execute.reset() });

    it('caso o "id" exista retorna a venda buscada por "id" no banco de dados', async () => {
      const response = await saleModel.getById(saleId);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(sale);
    });

    it('caso o "id" não exista retorna null', async () => {
      const response = await saleModel.getById(nonexistentSaleId);

      expect(connection.execute.calledTwice).to.be.true;
      expect(response).to.be.null;
    });
  });

  describe('create', () => {

    before(() => { connection.execute.onFirstCall().resolves([{ insertId: createdSale.id }]) });
    after(() => { connection.execute.reset() });

    it('retorna a venda criada no banco de dados', async () => {
      const response = await saleModel.create(createdSale.itemsSold);

      expect(connection.execute.callCount).to.be.equal(createdSale.itemsSold.length + 1);
      expect(response).to.be.deep.equal(createdSale);
    });
  });

  describe('update', () => {
    const { itemUpdated: [{ productId, quantity }] } = updatedSale;

    before(() => { connection.execute.resolves() });
    after(() => { connection.execute.reset() });

    it('retorna a venda atualizada no banco de dados', async () => {
      const response = await saleModel.update(saleId, productId, quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(updatedSale);
    });
  });

  describe('exclude', () => {

    before(() => { connection.execute.onFirstCall().resolves(dbItems) });
    after(() => { connection.execute.reset() });

    it('exclui a venda no banco de dados e retorna seus items excluidos', async () => {
      const response = await saleModel.exclude(saleId);

      expect(connection.execute.calledTwice).to.be.true;
      expect(response).to.be.deep.equal(items);
    });
  });
});
