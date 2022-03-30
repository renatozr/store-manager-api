const connection = require('./connection');

const serialize = ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
  saleId,
  date,
  productId,
  quantity,
});

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY sale_id, product_id;`,
  );

  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sale_id, product_id;`,
    [id],
  );

  if (sale.length === 0) return null;

  return sale.map(serialize);
};

module.exports = {
  getAll,
  getById,
};