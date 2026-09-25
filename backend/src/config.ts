import 'dotenv/config';

const port = Number(process.env.PORT ?? 4000);
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 100;

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port,
  databaseUrl: process.env.DATABASE_URL,
  origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  rateLimitWindowMs,
  rateLimitMax,
};
