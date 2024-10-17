export class PasswordMismatchException extends Error {
  constructor() {
    super('Old password is wrong');
  }
}
