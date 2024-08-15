require('dotenv').config();
const Importer = require('mysql-import');

const importer = new Importer({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

importer.import('./StoreManager.sql').then(() => {
    importer.getImported();
    console.log('SQL file were successfully imported!');
}).catch((err) => {
    console.error('Error importing the SQL file:', err);
});
