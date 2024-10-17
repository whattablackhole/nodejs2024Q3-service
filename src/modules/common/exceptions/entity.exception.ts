import { HttpException } from '@nestjs/common';

export class EntityNotFoundException extends Error {
  constructor(entityName: string) {
    super(`${entityName} not found`);
  }
}

export class UnprocessableEntity extends Error {
  constructor(message = `Invalid data`) {
    super(message);
  }
}

export class ServerErrorException extends HttpException {
  constructor(
    message = 'The server encountered an unexpected condition that prevented it from fulfilling the request',
    code = 500,
  ) {
    super(message, code);
  }
}
