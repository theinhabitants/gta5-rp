//init Commands file
logger = require('./logger/logger');
require('./auth/auth.js');
require('./admin/commands.js');
require('./chat/simple/chat.js');
require('./chat/voice/voice.js');
require('./character');
require('./camera');
require('./events/player.js');

logger.log.info("Modules are successfully loaded!");