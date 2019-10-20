const userDao = require("../datasources/dao/userDao");
const encrypt = require("../util/encrypt");
const logger = require("../logger/logger");
const PlayerBuilder = require("../entity/Player/PlayerBuilder");

mp.events.add("userLogin", async (player, email, password) => {
    let user;

    user = await getUserIfExist(email);
    if (user === undefined) {
        player.call("loginHandler", ["wrong-email"]);
        return;
    }

    if (!encrypt.comparePassword(password, user.password)) {
        player.call("loginHandler", ["wrong-password"]);
        return;
    }

    sessionPlayer = new PlayerBuilder()
        .setName()
        .setSurname()
        .setLevel()
        .setExperience()
        .setMoney()
        .setNumber()
        .setBankMoney()
        .setHome()
        .setCar()
        .build();

    player.call("loginHandler", ["success"]);
});

mp.events.add("userRegistration", async (player, email, password) => {
    let user, error;

    user = await getUserIfExist(email);
    if (user !== undefined) {
        player.call("registrationHandler", ["email-already-exist"]);
        return;
    }
    error = await userDao.save(email, password, player.ip);
    if (error) {
        logger.log.fatal(error);
        player.call("registrationHandler", ["internal-server-error"]);
    }

    logger.log.info("New user registered! email: %s, ip: %s", email, player.ip);
    player.call("registrationHandler", ["success"]);
});

async function getUserIfExist(email) {
    let user;
    try {
        user = await userDao.getByEmail(email);
    } catch (e) {
        return undefined;
    }
    return user;
}
