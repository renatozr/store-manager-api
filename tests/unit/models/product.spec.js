/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/product');

const {
  DBProducts,
  products,
  DBProduct,
  product,
  items,
} = require('../mocks/product');

describe('Product model methods', function () {
  before(function () { sinon.stub(connection, 'execute'); });
  after(function () { connection.execute.restore(); });

  describe('getAll', function () {
    it('returns all products from database', async function () {
      connection.execute.resolves(DBProducts);

      const response = await productModel.getAll();

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(products);

      connection.execute.reset();
    });
  });

  describe('getById', function () {
    it('returns product searched by id from database', async function () {
      connection.execute.resolves(DBProduct);

      const response = await productModel.getById(product.id);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);

      connection.execute.reset();
    });
  });

  describe('getByName', function () {
    it('returns product searched by name from database', async function () {
      connection.execute.resolves(DBProduct);

      const response = await productModel.getByName(product.name);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);

      connection.execute.reset();
    });
  });

  describe('create', function () {
    it('returns created product form databse', async function () {
      connection.execute.resolves([{ insertId: product.id }]);

      const response = await productModel.create(product.name, product.quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);

      connection.execute.reset();
    });
  });

  describe('update', function () {
    it('returns updated product from database', async function () {
      connection.execute.resolves();

      const response = await productModel.update(product.id, product.name, product.quantity);

      expect(connection.execute.calledOnce).to.be.true;
      expect(response).to.be.deep.equal(product);

      connection.execute.reset();
    });
  });

  describe('updateQuantity', function () {
    beforeEach(function () { connection.execute.resolves(); });
    afterEach(function () { connection.execute.reset(); });

    it('decreases quantity of products in the database', async function () {
      await productModel.updateQuantity(items, 'created');

      expect(connection.execute.callCount).to.be.equal(items.length);
    });

    it('increases quantity of products in the database', async function () {
      await productModel.updateQuantity(items, 'deleted');

      expect(connection.execute.callCount).to.be.equal(items.length);
    });
  });

  describe('exclude', function () {
    it('deletes product from database', async function () {
      connection.execute.resolves();

      await productModel.exclude(product.id);

      expect(connection.execute.calledOnce).to.be.true;

      connection.execute.reset();
    });
  });
});
