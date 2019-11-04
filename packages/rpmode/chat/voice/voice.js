mp.events.add('enableVoiceChat', (player, target) => {
    if(target) {
        player.enableVoiceTo(target);
    }
});

mp.events.add('disableVoiceChat', (player, target) => {
    if(target) {
        player.disableVoiceTo(target);
    }
});