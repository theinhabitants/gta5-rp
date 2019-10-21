const connectionPool = require('../mysql');

const getByUserId = async function (userId) {
    const result = await connectionPool.query('SELECT * FROM character WHERE user_id = ?', [userId]);
    if (result[0].length !== 1) {
        throw new Error('Character with user_id ' + userId + 'not found');
    }
    let characterFromDb = result[0][0];
    return {
        id: characterFromDb.id,
        name: characterFromDb.name,
        surname: characterFromDb.surname,
        level: characterFromDb.level,
        scin: characterFromDb.scin,
        userId: userId
    };
};

module.exports.getByUserId = getByUserId;
