const userDao = require("../datasources/dao/userDao");
const encrypt = require("../util/encrypt");

mp.events.add("userLogin", (player, email, password) => {
    let user;
    try {
        user = getUserIfExist(email, password);
    } catch (e) {
        player.call("loginHandler", ["fail"]);
        return;
    }

    if (user === undefined) {
        player.call("loginHandler", ["fail"]);
        return;
    }

    player.call("loginHandler", ["success"]);
});

function getUserIfExist(email, password) {
    const user = userDao.getByEmail(email);
    if (encrypt.comparePassword(password, user.password)) {
        return user;
    }
    return undefined;
}
