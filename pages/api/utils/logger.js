const Wrinkle = require('wrinkle');
const logger = new Wrinkle({ toFile: true, logLevel: process.env.LOG_LEVEL });

module.exports = logger;