export default class HttpError extends Error {
  status: string;
  isOperational: boolean;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
