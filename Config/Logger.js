const winston = require('winston');

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console transport
    new winston.transports.File({ filename: 'logs/app.log' }) // File transport
  ],
});

module.exports = logger;
