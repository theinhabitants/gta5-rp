// hp restore player hp to 100
mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

// armor restore player armor to 100
mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

// kill just kill player
mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

// coo prints player coordinates to console log
mp.events.addCommand('coo', (player) => {
    console.log(player.position);
});

// respawn spawn player at default spawn point
mp.events.addCommand('respawn', (player) => {
    const spawnPoints = require('../spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

// veh spawn any car buy its key-name (see gta5-docs for more info)
mp.events.addCommand('veh', (player, _, vehName) => {
    mp.vehicles.new(mp.joaat(vehName), player.position);
});

//tp teleports player to another player or to coordinates
mp.events.addCommand('tp', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("Ошибка! Используйте /tp [id] или /tp [id] [id] или /tp [x] [y] [z] или /tp [id] [x] [y] [z]");
        return;
    }
    args = args.split(" ");
    const first = parseInt(args[0]);
    const second = parseInt(args[1]);
    const third = parseInt(args[2]);
    const fourth = parseInt(args[3]);

    switch (args.length) {
        case 1:
            player.spawn(mp.players.at(first).position);
            player.outputChatBox("Вы телепортировались к: " + getPlayerNameWithID(mp.players.at(first)));
            break;
        case 2:
            const firstPlayer = mp.players.at(first);
            const secondPlayer = mp.players.at(second);

            mp.players.at(first).spawn(mp.players.at(second).position);
            player.outputChatBox(getPlayerNameWithID(firstPlayer) + " телепортирован к " + getPlayerNameWithID(secondPlayer));
            break;
        case 3:
            const newPos = new mp.Vector3(first, second, third);
            player.spawn(newPos);
            player.outputChatBox("Вы телепортировались на координаты: " + newPos.toString());
            break;
        case 4:
            const newPos2 = new mp.Vector3(second, third, fourth);
            player.spawn(newPos2);
            player.outputChatBox(getPlayerNameWithID(mp.players.at(first)) + " телепортирован на координаты " + newPos2.toString());
            break;
        default:
            player.outputChatBox("Ошибка! Используйте /tp [id] или /tp [id] [id] или /tp [x] [y] [z] или /tp [id] [x] [y] [z]");
    }
});

function getPlayerNameWithID(player) {
    return `${player.name} (${player.id})`;
}
