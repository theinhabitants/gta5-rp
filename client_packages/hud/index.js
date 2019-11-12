mp.gui.execute("window.location = 'package://hud/index.html'");

const utils = require('utils');

mp.events.add("disableEsc", function () {
    utils.disableInternalButton(true, 13, 200);
    setTimeout(() => utils.disableInternalButton(false, 13, 200), 200);
});

let isPress = false;

mp.keys.bind(116, false, function () {
    if(!isPress) {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        utils.displayClientHud(false);
        isPress = true;
    }
    else {
        mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        utils.displayClientHud(true);
        isPress = false;
    }
});


