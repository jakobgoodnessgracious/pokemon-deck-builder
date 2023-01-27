const { parseISO, format } = require('date-fns');
const DATE_FORMAT = 'LL-dd-yyyy H:m:ss.SS';
var fs = require('fs');
var util = require('util');

// nodejs doc version
// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// // custom simple logger
// const logger = new Console(output, errorOutput);
// // use it like console
// const count = 5;
// logger.log('count: %d', count);
// // in stdout.log: count 5


// // wtf v1
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
// Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

// console.log = function () {
//   logFile.write(util.format.apply(null, arguments) + '\n');
//   logStdout.write(util.format.apply(null, arguments) + '\n');
// }

// // wtf v2
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };

// console.error = console.log;

console.writeLog = (...d) => {
    logFile.write(util.format(...d) + '\n');
}
const withLogging = (handler) => {
    return async (req, res) => {
        const temp = res.send;
        res.send = (result) => {
            console.log(`${format(Date.now(), DATE_FORMAT)}\n${req.url}\n`, result);
            console.writeLog(`${format(Date.now(), DATE_FORMAT)}\n${req.url}\n`, result);
            temp(result);
        }
        await handler(req, res);
    }
}


module.exports = withLogging;