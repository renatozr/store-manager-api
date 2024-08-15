/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const saleController = require('../../../controllers/sale');
const saleService = require('../../../services/sale');

const { sales, sale, createdSale, updatedSale } = require('../mocks/sale');

const saleId = 1;
const nonExistentSaleId = 999;

describe('Sale controller methods', function () {
  const req = {};
  const res = {};

  before(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();

    sinon.stub(saleService, 'getAll');
    sinon.stub(saleService, 'getById');
    sinon.stub(saleService, 'create');
    sinon.stub(saleService, 'update');
    sinon.stub(saleService, 'exclude');
  });
  after(function () {
    saleService.getAll.restore();
    saleService.getById.restore();
    saleService.create.restore();
    saleService.update.restore();
    saleService.exclude.restore();
  });

  describe('getAll', function () {
    it('responds status 200 and sales json', async function () {
      saleService.getAll.resolves(sales);

      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sales)).to.be.true;

      saleService.getAll.reset();
      res.status.resetHistory();
      res.json.resetHistory();
    });
  });

  describe('getById', function () {
    before(function () {
      saleService.getById
        .onFirstCall().resolves(sale)
        .onSecondCall().resolves(null);
    });
    after(function () { saleService.getById.reset(); });

    afterEach(function () {
      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
    });

    it('if sale exists, responds status 200 and sale json', async function () {
      req.params = saleId;

      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sale)).to.be.true;
    });

    it('if sale didn\'t exists, responds status 404 and not found error json', async function () {
      req.params = nonExistentSaleId;

      await saleController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Sale not found' })).to.be.true;
    });
  });

  describe('create', function () {
    it('responds status 201 and created sale json', async function () {
      saleService.create.resolves(createdSale);
      req.body = createdSale.soldItems;

      await saleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdSale)).to.be.true;

      saleService.create.reset();
      res.status.resetHistory();
      res.json.resetHistory();
      req.body = undefined;
    });
  });

  describe('update', function () {
    it('responds status 200 and updated sale json', async function () {
      saleService.update.resolves(updatedSale);
      req.params = saleId;
      req.body = updatedSale.updatedItem;

      await saleController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedSale)).to.be.true;

      saleService.update.reset();
      res.status.resetHistory();
      res.json.resetHistory();
      req.params = undefined;
      req.body = undefined;
    });
  });

  describe('exclude', function () {
    it('responds status 204', async function () {
      saleService.exclude.resolves();
      req.params = saleId;

      await saleController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;

      saleService.exclude.reset();
      res.status.resetHistory();
      res.end.resetHistory();
      req.params = undefined;
    });
  });
});
