auth = require("../auth/auth");

mp.events.add("playerChat", (player, message) => {
    let date = new Date();
    const time = "[" + ("0" + (date.getHours())).slice(-2) + ":" + ("0" + (date.getMinutes())).slice(-2) + ":" + ("0" + (date.getSeconds())).slice(-2) + "]";

    let user = auth.getOnlineUser(player.id);
    const id = `(${user.id})`;

    let str = time + " - " + "!{white}" + player.name + id + ": " + message;

    mp.players.broadcastInRange(player.position, 25, str);
});