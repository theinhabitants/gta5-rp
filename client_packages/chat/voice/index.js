const BUTTON_G = 71,
    VOICE_CHAT_RANGE = 50.0;


let listeners = [];

setInterval(function () {
    let currentPlayer = mp.players.local;
    let playerPosition = currentPlayer.position;


    if (mp.keys.isDown(BUTTON_G) && mp.voiceChat.muted) {
        mp.voiceChat.muted = false;
        mp.gui.chat.push("Activated");
        currentPlayer.playFacialAnim("mic_chatter", "mp_facial");
    } else if (mp.keys.isUp(BUTTON_G) && !mp.voiceChat.muted) {
        mp.voiceChat.muted = true;
        mp.gui.chat.push("Disabled");
        currentPlayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    }

    mp.players.forEachInStreamRange(target => {
        if (currentPlayer === target || target.alreadyListener) {
            return 0;
        }
        let targetPosition = target.position;
        let distance = mp.game.system.vdist(playerPosition.x, playerPosition.y, playerPosition.z, targetPosition.x, targetPosition.y, targetPosition.z);

        if (distance <= VOICE_CHAT_RANGE) {
            listeners.push(target);
            target.alreadyListener = true;
            mp.events.callRemote("enableVoiceChat", target);

            target.voice3d = true;
            target.voiceVolume = 1;
        }
    });

    listeners.forEach((target) => {
        let targetPosition = target.position;
        let distance = mp.game.system.vdist(playerPosition.x, playerPosition.y, playerPosition.z, targetPosition.x, targetPosition.y, targetPosition.z);

        mp.gui.chat.push("DST: " + distance);
        if (distance > VOICE_CHAT_RANGE) {
            disableVoice(target);
        } else {
            target.voiceVolume = 1 - (distance / VOICE_CHAT_RANGE);
        }
    });
}, 300);

function disableVoice(player) {
    let idx = listeners.indexOf(player);

    if (idx !== -1) {
        listeners.splice(idx, 1);
    }

    player.alreadyListener = false;
    mp.events.callRemote("disableVoiceChat", player);
}

mp.events.add("playerQuit", (player) => {
    if (player.alreadyListener) {
        disableVoice(player);
    }
});
