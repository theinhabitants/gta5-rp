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
                    skin: characterFromDB.skin
                });
            }
        });
    });
};

module.exports.getByUserID = getByUserID;
