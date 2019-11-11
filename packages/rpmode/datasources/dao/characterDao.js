const connectionPool = require('../mysql');

const getByUserID = function (id) {
    return new Promise(function (resolve, reject) {
        connectionPool.query("SELECT * FROM `character` WHERE user_id = ?", [id], function (err, res) {
            if (err) {
                reject(err);
            }

            let characterFromDB = res[0];
            if (characterFromDB === undefined) {
                resolve(null);
            } else {
                resolve({
                    id: characterFromDB.id,
                    name: characterFromDB.name,
                    surname: characterFromDB.surname,
                    skin: characterFromDB.skin.toString(),
                });
            }
        });
    });
};

const create = function (name, surname, skin, user_id) {
    return new Promise(function (resolve, reject) {
        const level = 1;
        connectionPool.query("INSERT INTO `character` SET ?",
            {name, surname, level, skin, user_id}, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(null);
            });
    });
};

const updateSkin = function (skin, user_id) {
    return new Promise(function (resolve, reject) {
        connectionPool.query("UPDATE `character` SET `skin` = ? WHERE `user_id` = ?",
            [skin, user_id], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(null);
            });
    });
};

const isExist = function (user_id) {
    return new Promise(function (resolve, reject) {
        connectionPool.query("SELECT 1 FROM `character` WHERE `user_id` = ?", [user_id], function (err, res) {
            if (err) {
                reject(err);
            }
            let response = res.length === 1;
            resolve(response);
        });
    });
};

module.exports.getByUserID = getByUserID;
module.exports.create = create;
module.exports.updateSkin = updateSkin;
module.exports.isExist = isExist;

