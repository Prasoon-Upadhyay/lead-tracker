import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

config({ path: resolve(currentDirectory, '../.env.test'), override: true });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be set in backend/.env.test before running API tests.');
}

if (!new URL(databaseUrl).pathname.endsWith('_test')) {
  throw new Error('API tests require a dedicated database whose name ends with _test.');
}
