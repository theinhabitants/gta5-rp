mp.events.add("playerChat", (player, message) => {
    let date = Date.now();
    const time = "[" + date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString() + "]";
    const id = `[${player.id}]`
    let str = time + " - " + "!{white}" + player.name + id + ": " + message;
    mp.players.broadcastInRange(player.position, 25, str);
});