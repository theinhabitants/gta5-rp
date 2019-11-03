const BUTTON_G = 71,
    VOICE_CHAT_RANGE = 50.0;

const player = mp.players.local;
const playerPosition = player.position;

let listeners = [];

// mp.keys.bind(BUTTON_G, true, function () {
//     mp.voiceChat.muted = !mp.voiceChat.muted;
//     mp.gui.chat.push(((!mp.voiceChat.muted) ? "Activated" : "Disabled"));
// });

setInterval(function () {
    if(mp.keys.isDown(BUTTON_G) && mp.voiceChat.muted === true) {
        mp.voiceChat.muted = false;
        mp.gui.chat.push("Activated");
        mp.players.forEachInRange(player.position, VOICE_CHAT_RANGE, (target) => {
            if (player.dimension !== target.dimension || player === target || target.isListener) {
                return 0;
            }

            const targetPosition = target.position;

            const distance = mp.game.system.vdist(targetPosition.x, targetPosition.y, targetPosition.z, playerPosition.x, playerPosition.y, playerPosition.z);

            listeners.push(target);
            target.isListener = true;
            target.voiceVolume = 1 - (distance / VOICE_CHAT_RANGE);

            mp.events.callRemote("enableVoiceChat", target);
        });
    }
    else if(mp.keys.isUp(BUTTON_G) && mp.voiceChat.muted === false) {
        mp.voiceChat.muted = true;
        mp.gui.chat.push("Disabled");
    }

    listeners.forEach((target) => {

        if (target.isListener) {

            const targetPosition = target.position;

            const distance = mp.game.system.vdist(targetPosition.x, targetPosition.y, targetPosition.z, playerPosition.x, playerPosition.y, playerPosition.z);

            if(distance > VOICE_CHAT_RANGE) {
                disableVoice(target);
            }
            else {
                target.voiceVolume = 1 - (distance / VOICE_CHAT_RANGE);
            }

        }
    });
}, 300);

function disableVoice(player) {
    let idx = listeners.indexOf(player);

    if (idx !== -1) {
        listeners.splice(idx, 1);
    }

    player.isListener = false;
    mp.events.callRemote("disableVoiceChat", player);
}

mp.events.add("playerQuit", (player) =>
{
    if(player.isListener)
    {
        disableVoice(player);
    }
});
