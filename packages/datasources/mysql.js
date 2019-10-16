let mysql = require('mysql');

let pool = mysql.createPool({
  connectionLimit: 20,
  host     : 'remotemysql.com',
  port     : '3306',
  user     : 'Evg5778rJJ',
  password : 'jdL4Wxxr8J',
  database : 'Evg5778rJJ'
});

module.exports = pool;
