function playerJoinHandler(player) {
    console.log(player.name + " has joined. ID:" + player.id);
    player.outputChatBox(player.name + " has joined. ID:" + player.id);
}

mp.events.add("playerJoin", playerJoinHandler);

mp.events.add('playerDeath', (player) => {
    const spawnPoints = require('./admin/spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.add("playerChat", (player,message) =>{
    player.call('sendMessage',[player,message]);
    player.call('sendMessageForRadius',[player,message]);
});

mp.events.add('sendMessageForRadius', (player, message) =>{
    mp.players.broadcastInRange(player.position, 25, `${player.name}[${player.id}]: ${message}`);
});