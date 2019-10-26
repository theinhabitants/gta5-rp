let mysql = require('mysql');

let pool = mysql.createPool({
  host     : 'remotemysql.com',
  port     : '3306',
  user     : 'Evg5778rJJ',
  password : 'jdL4Wxxr8J',
  database : 'Evg5778rJJ'
});

module.exports = pool;