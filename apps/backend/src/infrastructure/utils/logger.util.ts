import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';

const fileLogFormat = winston.format.combine(winston.format.timestamp(), winston.format.simple());

export const winstonLoggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('APP', { prettyPrint: true })
      )
    }),
    new WinstonDailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      maxFiles: 10,
      zippedArchive: true,
      format: fileLogFormat
    }),
    new WinstonDailyRotateFile({
      level: 'silly',
      filename: 'logs/log-%DATE%.log',
      maxFiles: 10,
      zippedArchive: true,
      format: fileLogFormat
    })
  ]
});
