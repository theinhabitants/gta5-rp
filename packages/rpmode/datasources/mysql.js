let mysql = require('mysql');

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'gtarp'
};

let pool = mysql.createPool(config);

// Added to avoid situations if DB is down
pool.getConnection(function (err) {
    console.log(err);
    if (err) throw err; // not connected!
});

module.exports = pool;