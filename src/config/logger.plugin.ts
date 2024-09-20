import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';
import { envs } from './env.plugin';
import { ILogger } from '../interfaces/logger.interface';

export class Logger implements ILogger {
  private readonly logger: WinstonLogger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      defaultMeta: { service: 'administrator', time: new Date().toISOString() },
      transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        new transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        // - Write all logs with importance level of `info` or less to `combined.log`
        new transports.File({ dirname: 'logs', filename: 'combined.log' }),
      ],
    });
    if (!envs.PROD) this.addConsoleLogger();
  }

  addConsoleLogger() {
    this.logger.add(
      new transports.Console({
        format: format.simple(),
      })
    );
  }

  logInfo(info: string) {
    this.logger.info(info);
  }

  logError(error: string) {
    this.logger.error(error);
  }

  logDebug(message: string): void {
    this.logger.debug(message);
  }
}
