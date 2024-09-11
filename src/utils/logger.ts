import winston, { createLogger, transports } from 'winston';
const { combine, timestamp, printf, colorize, align, label } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: winston.config.npm.levels,

  format: combine(
    colorize({ all: true }),
    align(),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    customFormat,
    label({ label: 'Request' })
  ),

  transports: [
    new transports.File({
      filename: 'access.log',
      level: 'info',
    }),
  ],
});

export default logger;
