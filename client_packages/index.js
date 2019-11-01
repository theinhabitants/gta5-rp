require('./chat');
require('./noclip');
require('./character');
require('./camera');
require('./auth');

mp.keys.bind(13, true, function() {
    mp.gui.cursor.show(false, false);
});
