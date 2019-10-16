const connectionPool = require('../mysql');
const passUtils = require('../../util/encrypt');

const getById = async function (id) {
    const result = await connectionPool.query('SELECT * FROM user WHERE id = ?', [id]);
    if (result[0].length !== 1) {
        throw new Error('user with id ' + id + 'not found');
    }
    let userFromDb = result[0][0];
    return {
        id: userFromDb.id,
        username: userFromDb.username,
        email: userFromDb.email
    };
};

const getByUsername = async function (username) {
    const result = await connectionPool.query('SELECT * FROM user WHERE username = ?', [username]);
    if (result[0].length !== 1) {
        throw new Error('user with username ' + username + 'not found');
    }
    let userFromDb = result[0][0];
    return {
        id: userFromDb.id,
        username: userFromDb.username,
        email: userFromDb.email
    };
};

const save = async function (username, email, password) {
    let errors;
    password = passUtils.cryptPassword(password);
    try {
        await connectionPool.query(
            'INSERT INTO user SET ?',
            {username, email, password}
        );
    } catch (e) {
        errors = e;
    }
    return errors;
};

module.exports.getById = getById;
module.exports.getByUsername = getByUsername;

module.exports.save = save;
