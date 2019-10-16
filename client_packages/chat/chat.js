mp.events.add('sendMessage', (player, message) =>{
    mp.gui.chat.push(`${player.name}[${player.id}]: ${message}`);
});
