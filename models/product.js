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

const getByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?',
    [name],
  );

  return product;
};

const create = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return { id: insertId, name, quantity };
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};