const products = [
  {
    id: 1,
    name: 'Thor\'s hammer',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Shrinking suit',
    quantity: 20,
  },
  {
    id: 3,
    name: 'Captain America\'s shield',
    quantity: 30,
  },
];

const DBProducts = [[
  {
    id: 1,
    name: 'Thor\'s hammer',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Shrinking suit',
    quantity: 20,
  },
  {
    id: 3,
    name: 'Captain America\'s shield',
    quantity: 30,
  },
]];

const product = {
  id: 1,
  name: 'Thor\'s hammer',
  quantity: 10,
};

const DBProduct = [[{
  id: 1,
  name: 'Thor\'s hammer',
  quantity: 10,
}]];

const items = [
  {
    productId: 1,
    quantity: 4,
  },
  {
    productId: 2,
    quantity: 6,
  },
];

module.exports = { products, DBProducts, product, DBProduct, items };
