import cors from 'cors';
import express from 'express';

import { ResponseStatus, Status } from './common/literals.js';
import { errorHandlerMiddleware, notFoundMiddleware } from './common/middleware/error.middleware.js';
import { config } from './config.js';

export const app = express();

app.use(
  cors({
    origin: config.origin,
  }),
);
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(Status.OK).json({ status: ResponseStatus.OK });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
