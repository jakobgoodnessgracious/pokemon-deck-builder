var fs = require('fs');
var util = require('util');
const { parseISO, format } = require('date-fns');
const DATE_FORMAT = 'LL-dd-yyyy H:m:ss.SS';
const NODE_ENV = process.env.NODE_ENV;

// move this and dependencies to its own module.
// then export as logger from sharedLogger out of a different file;
class Logger {
    constructor(opts) {
        const { toFile, logDir, logLevel, fileDateFormat } = opts || {};
        this._toFile = !!toFile || !!logDir;
        this._logDir = logDir || './logs';
        this._fileDateFormat = fileDateFormat || 'LL-dd-yyy';
        this._level = logLevel || process.env.NODE_ENV === 'production' ? 'error' : 'debug';
        // set allowed log func levels  
        this._allowedLogFuncLevels = ['debug', 'info', 'warn', 'error'].reduce((accumulator, currentValue, index, array) => {
            if (array.indexOf(this._level) >= index) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, [])

        this._logFileStream = fs.createWriteStream(this._getCurrentLogPath(), { flags: 'a' });
        this._makeLogDir();
    }

    _formatLog(logLevel) {
        return `${format(Date.now(), DATE_FORMAT)} ${logLevel}:`;
    }

    _getCurrentLogPath = () => {
        return this._logDir + '/' + format(Date.now(), this._fileDateFormat) + '.log';
    }

    _guardLevel(logFuncLevel) {
        return this._allowedLogFuncLevels.includes(logFuncLevel);
    }

    _makeLogDir() {
        if (!this._logDir.startsWith('/') && !this._logDir.includes('..')) {
            if (!fs.existsSync(this._logDir)) {
                fs.mkdirSync(this._logDir);
                this.log('Created Dir', this._logDir);
            } else {
                this.log('Directory', this._logDir, 'already exists, not creating a new one.');
            }

        } else {
            this.error(`LOG_DIR=${this._logDir} is not a safe path. Exiting...`);
            process.exit();
        }
    }

    _writeToFile(text) {
        this._logFileStream.path = this._getCurrentLogPath();
        this._logFileStream.write(text);
    }

    _handleLog(level, ...textAsParams) {
        if (!this._guardLevel(level)) return;
        const toWrite = `${this._formatLog(level)} ${textAsParams.join(' ')}\n`;
        process.stdout.write(toWrite);
        if (this._toFile) {
            this._writeToFile(toWrite);
        }

    }

    log(...textAsParams) {
        this._handleLog('debug', ...textAsParams);
    }

    info(...textAsParams) {
        this._handleLog('info', ...textAsParams);
    }

    warn(...textAsParams) {
        this._handleLog('warn', ...textAsParams);
    }

    error(...textAsParams) {
        this._handleLog('error', ...textAsParams);
    }
}


const LOG_DIRECTION = process.env.LOG_DIRECTION || NODE_ENV === 'production' ? 'horizontal' : 'vertical';
const LOG_LEVEL = process.env.LOG_LEVEL;
const logger = new Logger({ toFile: true, logLevel: LOG_LEVEL });

const formatLog = (req, res, result) => {
    return `${req.url} ${res.statusCode} ${JSON.stringify(result, '', LOG_DIRECTION === 'horizontal' ? '' : 2)}`;
}


// console.time('writeLog');
// console.timeEnd('writeLog');

const withLogging = (handler) => {
    return async (req, res) => {
        const temp = res.send;
        res.send = (result) => {
            console.time('writeLog');
            logger.log(formatLog(req, res, result));
            console.timeEnd('writeLog');
            temp(result);
        }
        await handler(req, res);
    }
}

module.exports = withLogging;