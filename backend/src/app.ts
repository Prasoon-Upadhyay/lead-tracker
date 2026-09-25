import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { leadsRouter } from './app/leads/leads.router.js';
import { ApiRoutes, ResponseStatus, Status } from './common/literals.js';
import { errorHandlerMiddleware, notFoundMiddleware } from './common/middleware/error.middleware.js';
import { config } from './config.js';

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.origin,
  }),
);

app.use(
  rateLimit({
    windowMs: config.rateLimitWindowMs,
    limit: config.rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
);
app.use(express.json());

app.get(ApiRoutes.HEALTH, (_request, response) => {
  response.status(Status.OK).json({ status: ResponseStatus.OK });
});

app.use(leadsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
