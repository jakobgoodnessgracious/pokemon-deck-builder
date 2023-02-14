const logger = require('./logger');
const NODE_ENV = process.env.NODE_ENV;

const LOG_DIRECTION = process.env.LOG_DIRECTION || NODE_ENV === 'production' ? 'horizontal' : 'vertical';

const formatLog = (req, res, result) => {
    return `${req.url} ${res.statusCode} ${JSON.stringify(result, '', LOG_DIRECTION === 'horizontal' ? '' : 2)}`;
}

const withLogging = (handler) => {
    return async (req, res) => {
        const temp = res.send;
        res.send = (result) => {
            console.time('writeLog');
            logger.debug(formatLog(req, res, result));
            console.timeEnd('writeLog');
            temp(result);
        }
        await handler(req, res);
    }
}

module.exports = withLogging;