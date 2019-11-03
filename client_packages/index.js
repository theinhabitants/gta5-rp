require('./chat');
require('./noclip');
require('./character');
require('./camera');
require('./auth');

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
