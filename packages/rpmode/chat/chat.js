auth = require("../auth/auth");

// playerChat default event that calls by core when player send smth to the chat
mp.events.add("playerChat", (player, message) => {
    sendPlayerMessage(player, message);
});

// sendPlayerMessage send message using player name(id)
function sendPlayerMessage(player, message) {
    const time = getTime();

    let user = auth.getOnlineUser(player.id);
    const id = `(${user.id})`;

    let messageToSend = time + " - " + "!{white}" + player.name + id + ": " + message;

    mp.players.broadcastInRange(player.position, 25, messageToSend);
}

// sendMessage sends given message to general chat
function sendMessage(color, message) {
    const time = getTime();
    let messageToSend = time + " - " + "!{color}" + message;

    mp.players.broadcast(messageToSend);
}

// getTime returns formatted time at this moment
function getTime() {
    let date = new Date();
    return "[" + ("0" + (date.getHours())).slice(-2) + ":" + ("0" + (date.getMinutes())).slice(-2) + ":" + ("0" + (date.getSeconds())).slice(-2) + "]";
}

module.exports.sendPlayerMessage = sendPlayerMessage;
module.exports.sendMessage = sendMessage;