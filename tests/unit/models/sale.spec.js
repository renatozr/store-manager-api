/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const saleModel = require('../../../models/sale');

const {
  DBSales,
  sales,
  DBSale,
  sale,
  createdSale,
  updatedSale,
  DBItems,
  items,
} = require('../mocks/sale');

const saleId = 1;
const nonExistentSaleId = 999;

describe('Sale model methods', function () {
  before(function () { sinon.stub(connection, 'execute'); });
  after(function () { connection.execute.restore(); });

  describe('getAll', function () {
    it('returns all sales from database', async function () {
      connection.execute.resolves(DBSales);

      const response = await saleModel.getAll();

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(sales);

      connection.execute.reset();
    });
  });

  describe('getById', function () {
    before(function () {
      connection.execute
        .onFirstCall().resolves(DBSale)
        .onSecondCall().resolves([[]]);
    });
    after(function () { connection.execute.reset(); });

    it('if id exists, returns sale searched by id from database', async function () {
      const response = await saleModel.getById(saleId);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(sale);
    });

    it('if id didn\'t exists, returns null', async function () {
      const response = await saleModel.getById(nonExistentSaleId);

      expect(connection.execute.calledTwice).to.be.true;
      expect(response).to.be.null;
    });
  });

  describe('create', function () {
    it('returns created sale from database', async function () {
      connection.execute.onFirstCall().resolves([{ insertId: createdSale.id }]);

      const response = await saleModel.create(createdSale.itemsSold);

      expect(connection.execute.callCount).to.be.equal(createdSale.itemsSold.length + 1);
      expect(response).to.be.deep.equal(createdSale);

      connection.execute.reset();
    });
  });

  describe('update', function () {
    const { itemUpdated: [{ productId, quantity }] } = updatedSale;

    it('returns updated sale from database', async function () {
      connection.execute.resolves();

      const response = await saleModel.update(saleId, productId, quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(updatedSale);

      connection.execute.reset();
    });
  });

  describe('exclude', function () {
    it('deletes sale from database and returns deleted items', async function () {
      connection.execute.onFirstCall().resolves(DBItems);

      const response = await saleModel.exclude(saleId);

      expect(connection.execute.calledTwice).to.be.true;
      expect(response).to.be.deep.equal(items);

      connection.execute.reset();
    });
  });
});
