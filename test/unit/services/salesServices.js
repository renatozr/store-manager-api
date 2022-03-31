const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../models/sale');
const saleService = require('../../../services/sale');
const productModel = require('../../../models/product');

const { sales, sale, createdSale, items, updatedSale } = require('../mocks/sale');
const saleId = 1;

describe('Métodos de "saleService"', () => {
  
  before(() => {
    sinon.stub(saleModel, 'getAll');
    sinon.stub(saleModel, 'getById');
    sinon.stub(saleModel, 'create');
    sinon.stub(saleModel, 'update');
    sinon.stub(saleModel, 'exclude');

    sinon.stub(productModel, 'updateQuantity');
  });

  after(() => {
    saleModel.getAll.restore();
    saleModel.getById.restore();
    saleModel.create.restore();
    saleModel.update.restore();
    saleModel.exclude.restore();

    productModel.updateQuantity.restore();
  });

  describe('getAll', () => {
    
    before(() => { saleModel.getAll.resolves(sales) });
    after(() => { saleModel.getAll.reset() });

    it('retorna todas as vendas', async () => {
      const response = await saleService.getAll();
      
      expect(response).to.be.equal(sales);
    });
  });

  describe('getById', () => {
    
    before(() => { saleModel.getById.resolves(sale) });
    after(() => { saleModel.getById.reset() });

    it('retorna a venda buscada por "id"', async () => {
      const response = await saleService.getById(saleId);
      
      expect(response).to.be.equal(sale);
    });
  });

    describe('create', () => {
    
    before(() => {
      saleModel.create.resolves(createdSale);

      productModel.updateQuantity.resolves();
    });
    after(() => {
      saleModel.create.reset();

      productModel.updateQuantity.reset();
    });

    it('retorna a venda criada e atualiza a quantidade de produtos', async () => {
      const response = await saleService.create(items);
      
      expect(productModel.updateQuantity.calledOnce).to.be.true;
      expect(response).to.be.equal(createdSale);
    });
  });

  describe('update', () => {
    const { itemUpdated: [{ productId, quantity }] } = updatedSale;
    
    before(() => { saleModel.update.resolves(updatedSale) });
    after(() => { saleModel.update.reset() });

    it('retorna a venda atualizada', async () => {
      const response = await saleService.update(saleId, productId, quantity);
      
      expect(response).to.be.equal(updatedSale);
    });
  });

    describe('exclude', () => {
    
    before(() => {
      saleModel.exclude.resolves(items);

      productModel.updateQuantity.resolves();
    });
    after(() => {
      saleModel.exclude.reset();

      productModel.updateQuantity.reset();
    });

    it('exclui venda e atualiza a quantidade de produtos', async () => {
      await saleService.exclude(saleId);
      
      expect(saleModel.exclude.calledOnce).to.be.true;
      expect(productModel.updateQuantity.calledOnce).to.be.true;
    });
  });
});
