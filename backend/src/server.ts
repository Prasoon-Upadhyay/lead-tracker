import { app } from './app.js';
import { config } from './config.js';

app.listen(config.port, () => {
  console.info(`lead-tracker-backend RUNNING @ ${config.port}.`);
});
