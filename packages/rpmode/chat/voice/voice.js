const VOICE_CHAT_RANGE = 50;

mp.events.add('enableVoiceChat', (player, target) => {
    if(target) {
        player.outputChatBox("Activated");
        player.enableVoiceTo(target);
    }
});

mp.events.add('disableVoiceChat', (player, target) => {
    if(target) {
        player.disableVoiceTo(target);
    }
});