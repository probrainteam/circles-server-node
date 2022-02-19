const express = require('express');
import conf from './conf';
import loaders from './loaders';

async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  const PORT: string = conf.port; // 포트

  console.warn(`
    ---------------------------------------------
        Start Server with Condition :: ${process.env.NODE_ENV}
    ---------------------------------------------
    `);

  app.listen(PORT, () => {
    console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT}🛡️
        ################################################
      `);
  });
}

startServer();

export { startServer };
