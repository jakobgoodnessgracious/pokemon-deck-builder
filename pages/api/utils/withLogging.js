const { Console } = console;
const { parseISO, format } = require('date-fns');
const DATE_FORMAT = 'LL-dd-yyyy H:m:ss.SS';
const FILE_DATE_FORMAT = 'LL-dd-yyyy';
const LOG_DIR = process.env.LOG_DIR || './logs';
const NODE_ENV = process.env.NODE_ENV;

const LOG_DIRECTION = process.env.LOG_DIRECTION || process.env.NODE_ENV === 'production' ? 'horizontal' : 'vertical';
const LOG_LEVEL = process.env.LOG_LEVEL || NODE_ENV === 'production' ? 'error' : 'debug';
var fs = require('fs');
var util = require('util');

const formatLog = (req, res, result) => {
    return `${format(Date.now(), DATE_FORMAT)} debug: ${req.url} ${res.statusCode} ${JSON.stringify(result, '', LOG_DIRECTION === 'horizontal' ? '' : 2)}`;
}

if (!fs.existsSync(LOG_DIR)) {
    if (!LOG_DIR.startsWith('/') && !LOG_DIR.inculdes('..')) {
        fs.mkdirSync(LOG_DIR);
        console.log('Created Dir', LOG_DIR);
    } else {
        console.error(`LOG_DIR=${LOG_DIR} is not a safe path. Exiting...`);
        process.exit();
    }
}

// nodejs doc version
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// custom simple logger
output.path = './stdout.log';
const loggers = new Console({ colorMode: 'auto', stdout: output, stderr: errorOutput });

// // use it like console
// const count = 5;
// logger.log('count: %d', count);
// // in stdout.log: count 5
const getCurrentLogPath = () => {
    return LOG_DIR + '/' + format(Date.now(), FILE_DATE_FORMAT) + '.log';
}
const logFile = fs.createWriteStream(getCurrentLogPath(), { flags: 'a' });
const writeLog = (...p) => {
    logFile.path = getCurrentLogPath();
    logFile.write(util.format(...p) + '\n');
}

console.writeLog = (...p) => {
    console.time('writeLog');
    writeLog(...p);
    console.timeEnd('writeLog');
}
const withLogging = (handler) => {
    return async (req, res) => {
        const temp = res.send;
        res.send = (result) => {
            console.log(formatLog(req, res, result));
            console.writeLog(formatLog(req, res, result));
            temp(result);
        }
        await handler(req, res);
    }
}


module.exports = withLogging;