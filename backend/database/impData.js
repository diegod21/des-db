const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dig193809',
    database: 'dbde',
  });

module.exports = connection