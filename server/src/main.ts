import createServer from "../utils/createServer";
import Fastify from 'fastify'
import { disconnectFromDB, connectToDb } from "../utils/db";
import {FastifyInstance} from "fastify"
import logger from "../utils/logger"
const fastify = Fastify({
  logger: true
})


function gracefulShutdown(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    logger.info(`Goodbye, got signal ${signal}`);

    app.close();

    await disconnectFromDB();

    logger.info("My work here is done");

    process.exit(0);
  });
}

async function main() {
  const app = createServer();

  try {
    const url = await app.listen(4000, "0.0.0.0");

    logger.info(`Server is ready at ${url}`);

    await connectToDb();
    
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }

  const signals = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i], app);
  }
}

main();