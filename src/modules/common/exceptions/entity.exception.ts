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
