import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = req;

    this.loggingService.logRequest(method, originalUrl, query, body);

    res.on('finish', () => {
      this.loggingService.logResponse(res.statusCode, originalUrl);
    });

    next();
  }
}
