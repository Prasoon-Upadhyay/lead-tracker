import type { ErrorRequestHandler, RequestHandler } from 'express';

import { Error, Status } from '../literals.js';

export const notFoundMiddleware: RequestHandler = (request, response) => {
  response.status(Status.NOT_FOUND).json({
    message: Error.routeNotFound(request.method, request.path),
  });
};

export const errorHandlerMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);

  response.status(Status.INTERNAL_SERVER_ERROR).json({
    message: Error.UNEXPECTED_ERROR,
  });
};
