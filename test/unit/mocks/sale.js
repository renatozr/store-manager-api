const sales = [
	{
		saleId: 1,
		date: "2022-03-31T12:44:17.000Z",
		productId: 2,
		quantity: 10
	},
	{
		saleId: 2,
		date: "2022-03-31T12:44:17.000Z",
		productId: 3,
		quantity: 15
	}
];

const dbSales = [[
	{
		sale_id: 1,
		date: "2022-03-31T12:44:17.000Z",
		product_id: 2,
		quantity: 10
	},
	{
		sale_id: 2,
		date: "2022-03-31T12:44:17.000Z",
		product_id: 3,
		quantity: 15
	}
]];

const sale = [
	{
		saleId: undefined,
		date: "2022-03-31T12:44:17.000Z",
		productId: 2,
		quantity: 10,
	}
];

const dbSale = [[
	{
		date: "2022-03-31T12:44:17.000Z",
		product_id: 2,
		quantity: 10
	}
]];

const createdSale = {
	id: 3,
	itemsSold: [
		{
			productId: 1,
			quantity: 3
		}
	]
};

const updatedSale = {
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 6
    }
  ]
};

const dbItems = [[
	{
		product_id: 1,
		quantity: 3
	}
]];

const items = [
	{
		saleId: undefined,
		date: undefined,
		productId: 1,
		quantity: 3,
	}
];

module.exports = { sales, dbSales, sale, dbSale, createdSale, updatedSale, dbItems, items };