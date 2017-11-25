class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

class UnauthorizedError extends ExtendableError {};
class DatabaseError extends ExtendableError {};
class LogicError extends ExtendableError {};

module.exports = {
  UnauthorizedError,
  DatabaseError,
  LogicError,
}
