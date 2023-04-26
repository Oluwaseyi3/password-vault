import createServer from "../utils/createServer";
import Fastify from 'fastify'
import { disconnectFromDB } from "../utils/db";
import {FastifyInstance} from "fastify"
import logger from "../utils/logger"
const fastify = Fastify({
  logger: true
})


const shutDown = async(signal: string, app:FastifyInstance) => {

    process.on(signal,async () => {
      logger.info(`Goodbye, i got a signal from ${signal}`)  
    })

    app.close()
    //close fastify instance

    await disconnectFromDB()
    logger.info("Catch you later. See ya")
    process.exit(0)
}




const main = async() => {
    const app = createServer()
    try {
        const url =   await fastify.listen({ port: 4000, host: "0.0.0.0" })
        logger.info(`Server is ready at ${url}`);
        
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }


    //   const signals = ["SIGTERM", "SIGINT"]

    //   for (let i = 0; i < signals.length; i++) {
    //     shutDown(signals[i], app)
        
    //   }
    }

 
main()
