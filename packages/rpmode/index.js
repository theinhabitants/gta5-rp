//init Commands file
logger = require('./logger/logger');
require('./admin/commands.js');
require('./events/player.js');
require('./auth/auth.js');


logger.log.info("Modules are successfully loaded!");