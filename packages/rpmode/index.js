//init Commands file
require('./commands.js')
require('./events.js')
mp.events.add("playerChat", (player,message) =>{
    player.call('sendMessage',[player,message]);
});