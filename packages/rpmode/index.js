//init Commands file
logger = require('./logger/logger');
require('./auth/auth.js');
require('./admin/commands.js');
require('./chat/chat.js');
require('./character');
require('./camera');
require('./events/player.js');

logger.log.info("Modules are successfully loaded!");