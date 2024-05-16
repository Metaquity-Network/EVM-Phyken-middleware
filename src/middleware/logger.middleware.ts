import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createLogger, transports } from 'winston';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private exceptionsLogger = createLogger({
    transports: [
      new transports.File({
        filename: `logs/exceptions_${moment().format('YYYY-MM-DD')}.log`,
        level: 'error',
      }),
    ],
  });

  private successRequestLogger = createLogger({
    transports: [
      new transports.File({
        filename: `logs/success_${moment().format('YYYY-MM-DD')}.log`,
        level: 'info',
      }),
    ],
  });

  private anonymousRequestLogger = createLogger({
    transports: [
      new transports.File({
        filename: `logs/anonymous_${moment().format('YYYY-MM-DD')}.log`,
        level: 'info',
      }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const user = req['email'];
      const { statusCode, statusMessage } = res;
      if (user) {
        if (statusCode !== 200) {
          this.exceptionsLogger.error({
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            email: user.email,
            method,
            originalUrl,
            statusCode,
            statusMessage,
          });
        } else {
          this.successRequestLogger.info({
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            email: user.email,
            method,
            originalUrl,
            statusCode,
            statusMessage,
          });
        }
      } else {
        this.anonymousRequestLogger.info({
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          method,
          originalUrl,
          statusCode,
          statusMessage,
        });
      }
    });

    req.on('uncaughtException', () => {
      const user = req['email'];
      const { statusCode, statusMessage } = res;
      this.exceptionsLogger.error({
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: user.email,
        method,
        originalUrl,
        statusCode,
        statusMessage,
      });
    });

    req.on('unhandledRejection', () => {
      const user = req['email'];
      const { statusCode, statusMessage } = res;
      this.exceptionsLogger.error({
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: user.email,
        method,
        originalUrl,
        statusCode,
        statusMessage,
      });
    });

    next();
  }
}
