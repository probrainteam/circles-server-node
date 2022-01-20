import { getDomainUri, getDomainPort, getDBUri, getDBPort } from './conf/conf'
import loaders from './loaders '
const express = require('express');

async function startServer() {

    const app = express();
  
    await loaders({ expressApp: app });
    
    const MODE: String = process.argv[2]; // main or dev
    const PORT: String = getDomainPort(MODE) // 포트
    const domain: String = `${getDomainUri(MODE)}:${PORT}`; // uri:port
    const db: String = `${getDBUri(MODE)}:${getDBPort(MODE)}`; // uri:port

    console.warn(`
    ---------------------------------------------
        Start Server with Condition :: ${MODE}
        Using below options ...\n
        Domain : ${domain}
        db : ${db}
    ---------------------------------------------
    `);

    app.listen(PORT,() =>{
        console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT}🛡️
        ################################################
      `);
    });
  }
  
  startServer();