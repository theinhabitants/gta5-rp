const userDao = require("../datasources/dao/userDao");
const characterDao = require("../datasources/dao/characterDao");
const encrypt = require("../util/encrypt");
const logger = require("../logger/logger");
const characterCreationModule = require("../character/index");

// OnlineUsers represents all online users as map [localID]userObj
let OnlineUsers = new Map();

mp.events.add("userLogin", async (player, email, password) => {
    let user = await userDao.getByEmail(email);
    if (user === null) {
        player.call("loginHandler", ["wrong-email"]);
        return;
    }

    if (!encrypt.comparePassword(password, user.password)) {
        player.call("loginHandler", ["wrong-password"]);
        return;
    }

    let character = await characterDao.getByUserID(user.id);
    if (character === null) {
        logger.log.error("error: user id %s - doesn't have a character", user.id);
        player.call("loginHandler", ["internal-server-error"]);
        return;
    }

    OnlineUsers.set(player.id, user);

    player.name = character.name + " " + character.surname;
    characterCreationModule.applyCharacterSkin(player, character.skin);

    logger.log.info("User %s(%s) successfully authorized", player.name, user.id);
    player.call("loginHandler", ["success"]);
});

mp.events.add("userRegistration", async (player, email, password) => {
    let userInDb = await userDao.getByEmail(email);

    if (userInDb !== null) {
        player.call("registrationHandler", ["email-already-exist"]);
        return;
    }

    let createdUserId;

    try {
        const hashPass = encrypt.cryptPassword(password);
        createdUserId = await userDao.save(email, hashPass, player.ip);
    } catch (e) {
        logger.log.error(e);
        player.call("registrationHandler", ["internal-server-error"]);
    }

    let createdUser = await userDao.getByEmail(email);

    logger.log.info("New user registered! userId: %d, email: %s, ip: %s", createdUserId, email, player.ip);
    OnlineUsers.set(player.id, createdUser);

    player.call("registrationHandler", ["success"]);
});

mp.events.add("userSaveName", async (player, firstName, secondName) => {
    if (await characterDao.isNameExist(firstName, secondName) === true) {
        player.call("saveNameHandler", ["name-already-exist"]);
        return;
    }
    try {
    } catch (e) {
        logger.log.error(e);
        player.call("saveNameHandler", ["internal-server-error"]);
    }

    player.call("saveNameHandler", ["success", firstName, secondName]);
});

function getOnlineUser(userID) {
    return OnlineUsers.get(userID);
}

function removeOnlineUser(userID) {
    OnlineUsers.delete(userID);
}

async function getUserGameIDByName(name) {
    let charObj, charName;
    for (let [key, value] of OnlineUsers.entries()) {
        charObj = await characterDao.getByUserID(value.id);
        charName = charObj.name + " " + charObj.surname;

        if (charName.includes(name)) {
            return {id: key, name: charName};
        }
    }
    return undefined;
}

mp.events.add("playerJoin", (player) => {
    player.dimension = player.id + 1000;
});

module.exports.getOnlineUser = getOnlineUser;
module.exports.removeOnlineUser = removeOnlineUser;
module.exports.getUserGameIDByName = getUserGameIDByName;

