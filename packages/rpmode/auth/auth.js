const userDao = require("../datasources/dao/userDao");
const encrypt = require("../util/encrypt");
const logger = require("../logger/logger");

mp.events.add("userLogin", async (player, email, password) => {
    let user;

    user = await userDao.getByEmail(email);
    if (user === null) {
        player.call("loginHandler", ["wrong-email"]);
        return;
    }

    if (!encrypt.comparePassword(password, user.password)) {
        player.call("loginHandler", ["wrong-password"]);
        return;
    }

    player.call("loginHandler", ["success"]);
});

mp.events.add("userRegistration", async (player, email, password) => {
    let userInDb = await userDao.getByEmail(email);

    if (userInDb !== null) {
        player.call("registrationHandler", ["email-already-exist"]);
        return;
    }

    try {
        await userDao.save(email, password, player.ip);
    } catch (e) {
      logger.log.error(e);
        player.call("registrationHandler", ["internal-server-error"]);
    }

    logger.log.info("New user registered! email: %s, ip: %s", email, player.ip);
    player.call("registrationHandler", ["success"]);
});
