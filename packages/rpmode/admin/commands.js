mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('coo', (player) => {
    console.log(player.position); // return e.g. {x: 1337, y: 228, z: 70}
});

let spawnPoints = require('./spawn_points.json').SpawnPoints;

mp.events.addCommand('respawn', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.addCommand('veh', (player, _, vehName) => {
    mp.vehicles.new(mp.joaat(vehName), player.position);
});

mp.events.addCommand('tp', (player, args) => {
    args = args.split(" ")
    let firstID = parseInt(args[0]);
    let secondID = parseInt(args[1]);

    if (args.length === 1){
        player.spawn(mp.players.at(firstID).position);
        player.outputChatBox("Вы телепортировались к: " + getPlayerNameWithID(mp.players.at(firstID)));
        return
    } else if (args.length === 2){
        let firstPlayer = mp.players.at(firstID);
        let secondPlayer = mp.players.at(secondID);

        mp.players.at(firstID).spawn(mp.players.at(secondID).position);
        player.outputChatBox(getPlayerNameWithID(firstPlayer) + " телепортирован к " + getPlayerNameWithID(secondPlayer));
        return
    }
    player.outputChatBox("Ошибка! Используйте /tp [id] или /tp [id] [id]");
});

function getPlayerNameWithID(player) {
    return player.name + " (" + player.id + ")";
}