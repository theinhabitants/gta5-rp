require('./auth');
require('./chat');
require('./noclip');
require('./character');
require('./camera');

mp.keys.bind(13, true, function() {
    mp.gui.cursor.show(false, false);
});