mp.events.add("playerChat", (player, message) => {
    let date = new Date();
    const time = "[" + ("0" + (date.getHours() + 1)).slice(-2) + ":" + ("0" + (date.getMinutes() + 1)).slice(-2)  + ":" + ("0" + (date.getSeconds() + 1)).slice(-2)  + "]";
    const id = `[${player.id}]`
    let str = time + " - " + "!{white}" + player.name + id + ": " + message;
    mp.players.broadcastInRange(player.position, 25, str);
});