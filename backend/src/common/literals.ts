export class Status {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly BAD_REQUEST = 400;
  static readonly NOT_FOUND = 404;
  static readonly CONFLICT = 409;
  static readonly INTERNAL_SERVER_ERROR = 500;
}

export class Error {
  static readonly INVALID_REQUEST = 'Request validation failed.';
  static readonly DUPLICATE_EMAIL = 'A lead with this email already exists.';
  static readonly LEAD_NOT_FOUND = 'Lead not found.';
  static readonly UNEXPECTED_ERROR = 'An unexpected server error occurred.';

  static routeNotFound(method: string, path: string): string {
    return `Route ${method} ${path} was not found.`;
  }
}

export class ResponseStatus {
  static readonly OK = 'ok';
}

export class ApiRoutes {
  static readonly VERSION = 'v1';
  static readonly HEALTH = '/health';
  static readonly LEADS = `/api/${ApiRoutes.VERSION}/leads`;
}

