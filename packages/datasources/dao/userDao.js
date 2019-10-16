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

const getByEmail = async function (email) {
    const result = await connectionPool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (result[0].length !== 1) {
        throw new Error('user with email ' + email + 'not found');
    }
    let userFromDb = result[0][0];
    return {
        id: userFromDb.id,
        email: userFromDb.email
    };
};

const save = async function (email, password) {
    let errors;
    password = passUtils.cryptPassword(password);
    try {
        await connectionPool.query(
            'INSERT INTO user SET ?',
            {email, password}
        );
    } catch (e) {
        errors = e;
    }
    return errors;
};

module.exports.getById = getById;
module.exports.getByEmail = getByEmail;

module.exports.save = save;
