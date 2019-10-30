let mysql = require('mysql');

const config = {
    host     : 'remotemysql.com',
    user     : 'Evg5778rJJ',
    password : 'jdL4Wxxr8J',
    database : 'Evg5778rJJ',
    port     : '3306'
};

let pool = mysql.createPool(config);

// Added to avoid situations if DB is down
pool.getConnection(function (err) {
    console.log(err);
    if (err) throw err; // not connected!
});

module.exports = pool;