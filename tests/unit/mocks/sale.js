const CURRENT_TIMESTAMP = new Date().toISOString();

const sales = [
  {
    saleId: 1,
    date: CURRENT_TIMESTAMP,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: CURRENT_TIMESTAMP,
    productId: 3,
    quantity: 15,
  },
];

const DBSales = [[
  {
    sale_id: 1,
    date: CURRENT_TIMESTAMP,
    product_id: 2,
    quantity: 10,
  },
  {
    sale_id: 2,
    date: CURRENT_TIMESTAMP,
    product_id: 3,
    quantity: 15,
  },
]];

const sale = [{
  saleId: undefined,
  date: CURRENT_TIMESTAMP,
  productId: 2,
  quantity: 10,
}];

const DBSale = [[
  {
    date: CURRENT_TIMESTAMP,
    product_id: 2,
    quantity: 10,
  },
]];

const createdSale = {
  id: 3,
  soldItems: [
    {
      productId: 1,
      quantity: 3,
    },
  ],
};

const updatedSale = {
  saleId: 1,
  updatedItem: [
    {
      productId: 1,
      quantity: 6,
    },
  ],
};

const items = [
  {
    saleId: undefined,
    date: undefined,
    productId: 1,
    quantity: 3,
  },
];

const DBItems = [[
  {
    product_id: 1,
    quantity: 3,
  },
]];

module.exports = { sales, DBSales, sale, DBSale, createdSale, updatedSale, items, DBItems };
