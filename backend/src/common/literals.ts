export class Status {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly NOT_FOUND = 404;
  static readonly INTERNAL_SERVER_ERROR = 500;
}

export class Error {
  static readonly UNEXPECTED_ERROR = 'An unexpected server error occurred.';

  static routeNotFound(method: string, path: string): string {
    return `Route ${method} ${path} was not found.`;
  }
}

export class ResponseStatus {
  static readonly OK = 'ok';
}
