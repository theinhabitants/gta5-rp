require('./hud');
require('./chat/voice');
require('./noclip');
require('./character');
require('./camera');
require('./auth');
require('./choseway');
require('./player/nametags');

let isClicked = false;

mp.keys.bind(13, true, function () {
    if (isClicked) {
        mp.gui.cursor.show(false, false);
        isClicked = false
    } else {
        mp.gui.cursor.show(true, true);
        isClicked = true
    }
});
