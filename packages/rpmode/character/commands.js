const auth = require("../auth/auth");

mp.events.addCommand('id', async (player, name) => {
    if (name === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /id [name]");
        return;
    }

    let user = await auth.getUserGameIDByName(name);
    if (user === undefined) {
        player.outputChatBox("!{red}Ошибка! Игрок с таким именем не найден");
        return;
    }

    let str = "ID игрока " + user.name + ": !{yellow}" + user.id;
    player.outputChatBox(str);
});
