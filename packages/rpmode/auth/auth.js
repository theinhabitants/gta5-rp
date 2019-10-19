const userDao = require("../datasources/dao/userDao");
const encrypt = require("../util/encrypt");

mp.events.add("userLogin", async (player, email, password) => {
    let user;
    try {
        user = await getUserIfExist(email, password);
    } catch (e) {
        player.call("loginHandler", ["wrong-email"]);
        return;
    }

    if (user === undefined) {
        player.call("loginHandler", ["wrong-password"]);
        return;
    }

    player.call("loginHandler", ["success"]);
});

async function getUserIfExist(email, password) {
    const user = await userDao.getByEmail(email);
    if (encrypt.comparePassword(password, user.password)) {
        return user;
    }
    return undefined;
}
