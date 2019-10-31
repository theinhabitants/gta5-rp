const userDao = require("../datasources/dao/userDao");
const characterDao = require("../datasources/dao/characterDao");
const encrypt = require("../util/encrypt");
const logger = require("../logger/logger");
const chCreation = require("../character/index");

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

    player.name = character.name + " " + character.surname;
    OnlineUsers.set(player.id, user);
    chCreation.setPlayerSkin(player, character.skin);

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

function getOnlineUser(userID) {
    return OnlineUsers.get(userID);
}

function removeOnlineUser(userID) {
    OnlineUsers.delete(userID);
}

function playerJoinHandler(player) {
    player.call("showLogin");
    player.dimension = player.id + 1000;
}

mp.events.add("playerJoin", playerJoinHandler);

module.exports.getOnlineUser = getOnlineUser;
module.exports.removeOnlineUser = removeOnlineUser;

