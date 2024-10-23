import { HttpException } from '@nestjs/common';

export class ServerErrorException extends HttpException {
  constructor(
    message = 'The server encountered an unexpected condition that prevented it from fulfilling the request',
    code = 500,
  ) {
    super(message, code);
  }
}
