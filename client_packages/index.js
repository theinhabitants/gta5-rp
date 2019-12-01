require('./hud');
require('./chat/voice');
require('./noclip');
require('./character/appearance');
require('./character/name');
require('./camera');
require('./auth');
require('./choseway');
require('./player/nametags');
require('./vehicle/engine');

let isClicked = false;

mp.keys.bind(189, true, function () {
    if (isClicked) {
        mp.gui.cursor.show(false, false);
        isClicked = false
    } else {
        mp.gui.cursor.show(true, true);
        isClicked = true
    }
});
