const log4js = require('log4js');

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '_' + dd + '_' + yyyy;

log4js.configure({
    appenders: {
        'file': {
            type: 'file',
            filename: `./logs/rpmode_` + today + `.log`
        },
        'console': {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'info'
        },
        file: {
            appenders: ['file'],
            level: 'trace'
        }
    }
});

module.exports.log = log4js.getLogger("rpmode");
