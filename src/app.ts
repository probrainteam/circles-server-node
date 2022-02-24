const express = require('express');
import conf from './conf';
import loaders from './loaders';
import { logger } from '../src/utils/logger';

async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  const PORT: string = conf.port; // 포트

  logger.warn(`
    ---------------------------------------------
        Start Server with Condition :: ${process.env.NODE_ENV}
    ---------------------------------------------
    `);

  app.listen(PORT, () => {
    logger.info(`
        ################################################
            🛡️  Server listening on port: ${PORT}🛡️
        ################################################
      `);
  });
}

startServer();

export { startServer };
