const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;',
  );

  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

module.exports = {
  getAll,
  getById,
};