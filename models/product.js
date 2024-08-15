const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;',
  );

  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;',
    [id],
  );

  return product;
};

const getByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?;',
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

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const updateQuantity = async (items, state) => {
  const updateProductPromisses = items.map(({ productId, quantity }) => connection.execute(
    state === 'created'
      ? 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?;'
      : 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?;',
    [quantity, productId],
  ));

  await Promise.all(updateProductPromisses);
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  updateQuantity,
  exclude,
};
