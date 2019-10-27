require('./noclip');
require('./chat');
require('./auth');

mp.keys.bind(13, true, function() {
    mp.gui.cursor.show(false, false);
});