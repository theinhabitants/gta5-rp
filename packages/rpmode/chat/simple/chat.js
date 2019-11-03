auth = require("../../auth/auth");
require("./commands");

mp.events.add("playerChat", (player, message) => {
    let date = new Date();
    const time = "[" + ("0" + (date.getHours())).slice(-2) + ":" + ("0" + (date.getMinutes())).slice(-2) + ":" + ("0" + (date.getSeconds())).slice(-2) + "]";

    const id = ` (${player.id})`;

    let str = "!{white}" + player.name + id + ": " + message;

    mp.players.broadcastInRange(player.position, 25, str);
});
