import 'dotenv/config';

const port = Number(process.env.PORT ?? 4000);

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port,
  databaseUrl: process.env.DATABASE_URL,
  origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
};
