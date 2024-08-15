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

const create = async (items) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  const createItemPromisses = items.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [insertId, productId, quantity],
  ));

  await Promise.all(createItemPromisses);

  return { id: insertId, soldItems: items };
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
    [quantity, saleId, productId],
  );

  return { saleId, updatedItem: [{ productId, quantity }] };
};

const exclude = async (id) => {
  const [items] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );

  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return items.map(serialize);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
