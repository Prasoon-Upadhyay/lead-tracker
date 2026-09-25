import type { RequestHandler } from 'express';
import type { z } from 'zod';

import { Error, Status } from '../literals.js';

type ValidationTargets = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export const validateRequest = (targets: ValidationTargets): RequestHandler => {
  return (request, response, next) => {
    for (const [target, schema] of Object.entries(targets)) {
      if (!schema) {
        continue;
      }

      const result = schema.safeParse(request[target as keyof typeof request]);

      if (!result.success) {
        response.status(Status.BAD_REQUEST).json({
          message: Error.INVALID_REQUEST,
          details: result.error.flatten(),
        });
        return;
      }

      Object.assign(request[target as keyof typeof request], result.data);
    }

    next();
  };
};
