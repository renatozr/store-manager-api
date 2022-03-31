const { expect } = require('chai');
const sinon = require('sinon');

const saleService = require('../../../services/sale');
const saleController = require('../../../controllers/sale');

const { sales, sale, createdSale, updatedSale } = require('../mocks/sale');
const saleId = 1;
const nonexistentSaleId = 999;

describe('Métodos de "saleController"', () => {
  const req = {};
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();

    sinon.stub(saleService, 'getAll');
    sinon.stub(saleService, 'getById');
    sinon.stub(saleService, 'create');
    sinon.stub(saleService, 'update');
    sinon.stub(saleService, 'exclude');
  });
  after(() => {
    saleService.getAll.restore();
    saleService.getById.restore();
    saleService.create.restore();
    saleService.update.restore();
    saleService.exclude.restore();
  });

  describe('getAll', () => {

    before(() => { saleService.getAll.resolves(sales) });
    after(() => {
      saleService.getAll.reset();

      res.status.resetHistory();
      res.json.resetHistory();
    });

    it('responde status 200 com o json das vendas', async () => {
      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sales)).to.be.true;
    });
  });

  describe('getById', () => {

    before(() => {
      saleService.getById
        .onFirstCall().resolves(sale)
        .onSecondCall().resolves(null);
    });
    after(() => { saleService.getById.reset() });

    afterEach(() => {
      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
    });

    it('caso a venda exista, responde status 200 com o json da venda', async () => {
      req.params = saleId;

      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sale)).to.be.true;
    });

    it('caso a venda não exista, responde status 404 com o json { "message": "Sale not found" }', async () => {
      req.params = nonexistentSaleId;

      await saleController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Sale not found' })).to.be.true;
    });
  });

  describe('create', () => {

    before(() => {
      saleService.create.resolves(createdSale);

      req.body = createdSale.itemsSold;
    });
    after(() => {
      saleService.create.reset();

      res.status.resetHistory();
      res.json.resetHistory();

      req.body = undefined;
    });

    it('responde status 201 com o json da venda criada', async () => {
      await saleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdSale)).to.be.true;
    });
  });

  describe('update', () => {

    before(() => {
      saleService.update.resolves(updatedSale);

      req.params = saleId;
      req.body = updatedSale.itemUpdated;
    });
    after(() => {
      saleService.update.reset();

      res.status.resetHistory();
      res.json.resetHistory();

      req.params = undefined;
      req.body = undefined;
    });

    it('responde status 200 com o json da venda atualizada', async () => {
      await saleController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedSale)).to.be.true;
    });
  });

  describe('exclude', () => {

    before(() => {
      saleService.exclude.resolves();

      req.params = saleId;
    });
    after(() => {
      saleService.exclude.reset();

      res.status.resetHistory();
      res.end.resetHistory();

      req.params = undefined;
    });

    it('responde status 204 sem conteúdo', async () => {
      await saleController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
    });
  });
});
