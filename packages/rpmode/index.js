//init Commands file
logger = require('./logger/logger');
require('./auth/auth.js');
require('./admin/commands.js');
require('./events/player.js');
require('./chat/chat.js');

logger.log.info("Modules are successfully loaded!");