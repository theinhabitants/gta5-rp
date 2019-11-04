const
    MAX_DISTANCE = 30 * 30,

    ICON = 'leaderboard_audio_3',
    DIR = "mpleaderboard",
    HEADING = 0,
    COLOUR = [255, 255, 255, 255],

    SCALE_MULTIPLIER = 0.8,
    resolution = mp.game.graphics.getScreenActiveResolution(0, 0),
    textureResolution = mp.game.graphics.getTextureResolution(DIR, ICON),
    SCALE = [(SCALE_MULTIPLIER * textureResolution.x) / resolution.x, (SCALE_MULTIPLIER * textureResolution.y) / resolution.y];


mp.nametags.enabled = false;

mp.events.add('render', (nameTags) => {
    nameTags.forEach(nameTag => {
        let [player, x, y, distance] = nameTag;

        if (distance <= MAX_DISTANCE) {
            drawPlayerVoiceIcon(player, x, y);
            mp.game.graphics.drawText("Неизвестный (" + player.id + ")", [x, y + 0.030],
                {
                    font: 4,
                    color: [255, 255, 255, 255],
                    scale: [0.35, 0.35],
                    outline: true
                });
        }
    })
});


function drawPlayerVoiceIcon(player, x, y) {
    if (player.isVoiceActive) {
        if (mp.game.graphics.hasStreamedTextureDictLoaded(DIR)) {
            mp.game.graphics.drawSprite(DIR, ICON, x, y - 0.001 * SCALE_MULTIPLIER, SCALE[0], SCALE[1], HEADING, COLOUR[0], COLOUR[1], COLOUR[2], COLOUR[3]);
        } else {
            mp.game.graphics.requestStreamedTextureDict(DIR, true);
        }
    }
}
