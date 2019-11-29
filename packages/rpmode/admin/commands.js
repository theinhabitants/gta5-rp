const logger = require("../logger/logger");
const spawnPoints = require('../spawn_points.json').SpawnPoints;
const utils = require('../util/utils');
const weaponsList = utils.objToMap(require('../weapons.json'));

mp.events.addCommand('sethp', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /sethp [value] или /sethp [id] [value]");
        return;
    }
    args = args.split(" ");

    switch (args.length) {
        case 1:
            changePlayerVariables(player, "hp", args[0]);
            player.outputChatBox("Вы изменили уровень своего здоровья на: " + args[0]);
            break;
        case 2:
            const playerID = parseInt(args[0]);
            const secondPlayer = mp.players.at(playerID);
            changePlayerVariables(player, "hp", args[1]);
            player.outputChatBox("Вы изменили уровень здоровья игрока " + getPlayerNameWithID(secondPlayer) + " на: " + args[1]);
            secondPlayer.outputChatBox(getPlayerNameWithID(player) + " изменил уровень вашего здоровья на: " + args[1]);
            break;
        default:
            player.outputChatBox("!{red}Ошибка! Используйте /sethp [value] или /sethp [id] [value]");
    }
});

mp.events.addCommand('setarmor', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /setarmor [value] или /setarmor [id] [value]");
        return;
    }
    args = args.split(" ");

    switch (args.length) {
        case 1:
            changePlayerVariables(player, "armour", args[0]);
            player.outputChatBox("Вы изменили уровень своей брони на: " + args[0]);
            break;
        case 2:
            const playerID = parseInt(args[0]);
            const secondPlayer = mp.players.at(playerID);
            changePlayerVariables(player, "armour", args[1]);
            player.outputChatBox("Вы изменили уровень брони игрока " + getPlayerNameWithID(secondPlayer) + " на: " + args[1]);
            secondPlayer.outputChatBox(getPlayerNameWithID(player) + " изменил уровень вашей брони на: " + args[1]);
            break;
        default:
            player.outputChatBox("!{red}Ошибка! Используйте /setarmor [value] или /setarmor [id] [value]");
    }
});

mp.events.addCommand('kill', (player, secondPlayerID) => {
    if (secondPlayerID === undefined) {
        changePlayerVariables(player, "kill");
        player.outputChatBox("!{red}Вы совершили самоубийство");
        return;
    }

    const playerID = parseInt(secondPlayerID);
    const secondPlayer = mp.players.at(playerID);
    changePlayerVariables(player, "kill");
    player.outputChatBox("!{red}Вы убили игрока: " + getPlayerNameWithID(secondPlayer));
    secondPlayer.outputChatBox("!{red}" + getPlayerNameWithID(player) + " убил вас");
});

mp.events.addCommand('coo', (player, secondPlayerID) => {
    if (secondPlayerID === undefined) {
        player.outputChatBox("Ваши координаты: " + getPosition(player.position) + " | Камера: " + player.heading.toFixed(2));
        logger.log.debug("COO: " + getPosition(player.position) + ", head: " + player.heading.toFixed(2)); // return e.g. {x: 1337, y: 228, z: 70}
        return;
    }

    const playerID = parseInt(secondPlayerID);
    const secondPlayer = mp.players.at(playerID);
    player.outputChatBox("Координаты игрока" + getPlayerNameWithID(secondPlayer) + ": " + getPosition(secondPlayer.position) + " | Камера: " + secondPlayer.heading.toFixed(2));
});

mp.events.addCommand('respawn', (player, secondPlayerID) => {
    if (secondPlayerID === undefined) {
        player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
        player.outputChatBox("Вы зареспавнились");
        return;
    }

    const playerID = parseInt(secondPlayerID);
    const secondPlayer = mp.players.at(playerID);
    secondPlayer.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    secondPlayer.outputChatBox(getPlayerNameWithID(player) + " зареспавнил вас");
    player.outputChatBox("Вы зареспавнили игрока: " + getPlayerNameWithID(secondPlayer));
});

mp.events.addCommand('veh', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /veh [veh name] или /veh [id] [veh name]");
        return;
    }
    args = args.split(" ");

    switch (args.length) {
        case 1:
            try {
                mp.vehicles.new(mp.joaat(args[0]), player.position);
                player.outputChatBox("Транспортное средство " + args[0] + " заспавнено");
            } catch (e) {
                player.outputChatBox("!{red}Ошибка! Такое транспортное средство не существует");
                return;
            }
            break;
        case 2:
            try {
                const playerID = parseInt(args[0]);
                const secondPlayer = mp.players.at(playerID);
                mp.vehicles.new(mp.joaat(args[1]), player.position);
                player.outputChatBox("Транспортное средство " + args[1] + " заспавнено для игрока " + getPlayerNameWithID(secondPlayer));
                secondPlayer.outputChatBox(getPlayerNameWithID(player) + " заспавнил вам транспортное средство: " + args[1]);
            } catch (e) {
                player.outputChatBox("!{red}Ошибка!Транспортное средство" + args[1] + "не существует");
                return;
            }
            break;
        default:
            player.outputChatBox("!{red}Ошибка! Используйте /veh [veh name] или /veh [id] [veh name]");
    }
});

mp.events.addCommand('giveweapon', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /giveweapon [weapon] [ammo] или /giveweapon [id] [weapon] [ammo]");
        return;
    }
    args = args.split(" ");
    let weapon;
    let ammo;
    let weaponName;

    switch (args.length) {
        case 2:
            weaponName = args[0];
            weapon = parseInt(weaponsList.get(weaponName));
            ammo = parseInt(args[1]);

            player.giveWeapon(weapon, ammo);
            player.outputChatBox("Вам выдано оружие: " + weaponName + " и " + ammo + " пуль");
            break;
        case 3:
            const playerID = parseInt(args[0]);
            const secondPlayer = mp.players.at(playerID);

            weaponName = args[1];
            weapon = parseInt(weaponsList.get(weaponName));
            ammo = parseInt(args[2]);

            secondPlayer.giveWeapon(weapon, ammo);
            secondPlayer.outputChatBox(getPlayerNameWithID(player) + " выдал вам оружие: " + weaponName + " и " + ammo + " пуль");
            player.outputChatBox("Вы выдали " + getPlayerNameWithID(secondPlayer) + " оружие: " + weaponName + " и " + ammo + " пуль");
            break;
        default:
            player.outputChatBox("!{red}Ошибка! Используйте /giveweapon [weapon] [ammo] или /giveweapon [id] [weapon] [ammo]");
    }
});

mp.events.addCommand('tp', (player, args) => {
    if (args === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /tp [id] или /tp [id] [id] или /tp [x] [y] [z] или /tp [id] [x] [y] [z]");
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
            mp.players.at(first).outputChatBox(getPlayerNameWithID(player) + " телепортировал вас к " + getPlayerNameWithID(secondPlayer));
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
            mp.players.at(first).outputChatBox(getPlayerNameWithID(player) + " телепортировал вас на координаты " + newPos2.toString());
            break;
        default:
            player.outputChatBox("!{red}Ошибка! Используйте /tp [id] или /tp [id] [id] или /tp [x] [y] [z] или /tp [id] [x] [y] [z]");
    }
});

mp.events.addCommand('al', (player, args) => {
    args = args.split(" ");

    const first = parseInt(args[0]);
    const second = args[1];

    player.call("testAlert", [first, second]);
});

mp.events.addCommand('o', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /o [текст]");
        return;
    }
    const str = "!{yellow}Администратор " + player.name + ": " + message;
    mp.players.broadcast(str);
});


function getPlayerNameWithID(player) {
    return `${player.name} (${player.id})`;
}

function changePlayerVariables(player, variable, value) {
    switch (variable) {
        case "hp":
            player.health = parseInt(value);
            break;
        case "armour":
            player.armour = parseInt(value);
            break;
        case "kill":
            player.health = 0;
            break;
    }
}

// getPosition returns position in format like: {x: 123.22, y: 22.22, z: 20.21}
function getPosition(position) {
    return "{x: " + position.x.toFixed(2) + ", y: " + position.y.toFixed(2) + ", z: " + position.z.toFixed(2) + "}";
}
