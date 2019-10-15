var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'remotemysql.com:3306',
  user     : 'Evg5778rJJ',
  password : 'jdL4Wxxr8J',
  database : 'Evg5778rJJ'
});

module.exports = connection;