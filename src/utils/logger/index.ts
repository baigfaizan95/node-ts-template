import winston from 'winston';
import appRootPath from 'app-root-path';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
const stringify = require('json-stringify-safe');

/*
 * Configuration
 */

const myLogFormat = winston.format.printf((info) => {
  if (typeof(info.message) === typeof({})) {
    info.message = stringify(info.message, null, 2);
  }

  let log = `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`;
  if (info.meta) {
    log += ` => ${stringify(info.meta, null, 2)}`;
  }
  return log;
});

const options = {
  file: {
    level: 'info', // Only write logs of info level or higher
    filename: 'bi-api-%DATE%.log', // logfile name = bi-api-2018-09-26.log
    dirname: `${appRootPath}/logs`, // store logs in ./logs folder
    datePattern: 'YYYY-MM-DD', // rotate logs daily
    zippedArchive: true, // zip after logging
    maxSize: '20m', // max log size
    handleExceptions: true,
  },
  console: {
    level: 'debug', // Only write logs of debug level or higher
    handleExceptions: true,
  },
};

/*
 * Daily File Transporter
 */

const fileTransport = new winstonDailyRotateFile(options.file);

fileTransport.on('rotate', (oldFilename, newFilename) => {
  // upload file to s3 bucket here and delete it from the drive (or set max days in options)
  console.log(`Rotating Log File ${oldFilename} to ${newFilename}`);
});

/*
 * Winston Logger Instance
 */

const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myLogFormat,
  ),
  transports: [
    fileTransport,
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const logger = {
  error: winstonLogger.error,
  warn: winstonLogger.warn,
  info: winstonLogger.info,
  http: winstonLogger.http,
  verbose: winstonLogger.verbose,
  debug: winstonLogger.debug,
  log: winstonLogger.log,
};
