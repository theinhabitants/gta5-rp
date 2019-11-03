mp.events.addCommand('me', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /me [текст]");
        return;
    }

    let str = "!{#dd42f5}" + player.name + " " + message;
    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('do', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /do [текст]");
        return;
    }

    let str = "!{#dd42f5}" + message + " " + player.name;
    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('try', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /try [текст]");
        return;
    }

    const randNum = Math.floor(Math.random() * Math.floor(2));
    let trn = randNum === 0 ? "!{green} удачно" : "!{red} неудачно";
    const str = "!{#dd42f5}" + player.name + " " + message + " " + trn;

    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('todo', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте * как разделитель, например: /todo Какая крутая машина*показывая пальцем на Infernus");
        return;
    }

    let msgArgs = message.split("*");
    if (msgArgs.length !== 2) {
        player.outputChatBox("!{red}Ошибка! Используйте * как разделитель, например: /todo Какая крутая машина*показывая пальцем на Infernus");
        return;
    }

    let str = msgArgs[0] + "!{#dd42f5} - сказал(а)" + player.name + " " + msgArgs[1];
    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('b', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /b [текст]");
        return;
    }

    let str = "!{gray}(( " + player.name + ": " + message + " ))";
    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('s', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /s [текст]");
        return;
    }

    let str = player.name + " крикнул(а): " + message + "!!";
    mp.players.broadcastInRange(player.position, 25, str);
});

mp.events.addCommand('w', (player, message) => {
    if (message === undefined) {
        player.outputChatBox("!{red}Ошибка! Используйте /w [текст]");
        return;
    }

    let str = player.name + " прошептал(а): " + message;
    mp.players.broadcastInRange(player.position, 25, str);
});
