const connectionPool = require('../mysql');

const getById = function (id) {
    return new Promise(function (resolve, reject) {
        connectionPool.query('SELECT * FROM user WHERE id = ?', id, function (err, res) {
            if (err) {
                reject(err);
            }

            let userFromDb = res[0];
            if (userFromDb === undefined) {
                resolve(null);
            } else {
                resolve({
                    id: userFromDb.id,
                    email: userFromDb.email,
                    password: userFromDb.password,
                    ip: userFromDb.ip
                });
            }
        });
    });
};

const getByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        connectionPool.query("SELECT * FROM user WHERE email = ?", [email], function (err, res) {
            if (err) {
                reject(err);
            }

            let userFromDb = res[0];
            if (userFromDb === undefined) {
                resolve(null);
            } else {
                resolve({
                    id: userFromDb.id,
                    email: userFromDb.email,
                    password: userFromDb.password,
                    ip: userFromDb.ip
                });
            }
        });
    });
};

const save = function (email, password, ip) {
    return new Promise(function (resolve, reject) {
        connectionPool.query('INSERT INTO user SET ?',
            {email, password, ip}, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(null);
            });
    });
};

module.exports.getById = getById;
module.exports.getByEmail = getByEmail;

module.exports.save = save;
