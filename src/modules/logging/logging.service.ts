import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { appendFile, rename, stat } from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logInfoFilePath;
  private readonly logErrorFilePath;
  private readonly maxFileSize = parseInt(
    process.env.MAX_LOG_FILE_SIZE || '1048576',
    10,
  );

  constructor() {
    super();
    this.logInfoFilePath = 'logs/info.log';
    this.logErrorFilePath = 'logs/error.log';
    const logLevels = this.getLogLevels(
      parseInt(process.env.LOG_LEVEL || '0', 10),
    );
    this.setLogLevels(logLevels);
  }

  logRequest(method: string, url: string, query: any, body: any): void {
    const logMessage = `Incoming Request: ${method} ${url} | Query: ${JSON.stringify(
      query,
    )} | Body: ${JSON.stringify(body)}\n`;
    if (this.isLevelEnabled('log')) {
      this.log(logMessage);
      this.writeToFile(logMessage, 'log');
    }
  }

  logResponse(statusCode: number, url: string): void {
    const logMessage = `Response: ${statusCode} | URL: ${url}\n`;
    if (this.isLevelEnabled('log')) {
      this.log(logMessage);
      this.writeToFile(logMessage, 'log');
    }
  }

  logError(error: any, url?: string): void {
    const logMessage = url
      ? `Error occurred on ${url}: ${error.message || error}\n`
      : `Error: ${error.message || error}\n`;
    if (this.isLevelEnabled('error')) {
      this.error(logMessage);
      this.writeToFile(logMessage, 'error');
    }
  }

  logUncaughtException(error: Error): void {
    const logMessage = `Uncaught Exception: ${error.message}\n${error.stack}\n`;
    if (this.isLevelEnabled('error')) {
      this.error(logMessage);
      this.writeToFile(logMessage, 'error');
    }
  }

  logUnhandledRejection(reason: any, promise: Promise<any>): void {
    const logMessage = `Unhandled Rejection: ${reason}\n${promise.toString()}\n`;
    if (this.isLevelEnabled('error')) {
      this.error(logMessage);
      this.writeToFile(logMessage, 'error');
    }
  }

  private async writeToFile(message: string, level: string) {
    const filePath =
      level === 'error' ? this.logErrorFilePath : this.logInfoFilePath;
    await this.checkFileRotation(filePath);
    await appendFile(filePath, this.formatLogMessage(message, level), {
      encoding: 'utf8',
    });
  }

  private getLogLevels(minLogLevel: number): LogLevel[] {
    const levels: { [key: number]: LogLevel } = {
      0: 'log',
      1: 'error',
      2: 'warn',
      3: 'debug',
      4: 'verbose',
    };

    return Object.keys(levels)
      .map(Number)
      .filter((level) => level <= minLogLevel)
      .map((level) => levels[level]);
  }

  private formatLogMessage(message: string, level: string): string {
    const timestamp = new Date().toString();
    return timestamp + ' ' + level.toUpperCase() + ' ' + message;
  }

  private async checkFileRotation(filePath: string) {
    try {
      const fileStats = await stat(filePath);

      if (fileStats.size > this.maxFileSize) {
        const rotatedFilePath = this.getRotatedFileName(filePath);
        await rename(filePath, rotatedFilePath);
      }
    } catch {
      return;
    }
  }

  private getRotatedFileName(filePath: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const { dir, name, ext } = path.parse(filePath);
    return path.join(dir, `${name}-${timestamp}${ext}`);
  }
}
