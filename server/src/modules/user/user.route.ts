import { FastifyError, FastifyInstance, FastifyPluginOptions} from "fastify"
import { registerUserHandler } from "./user.controller";

const userRoutes = (
    app: FastifyInstance,
     _: FastifyPluginOptions,
      done: (err?: FastifyError) => void
     ) =>{



    app.post('/', registerUserHandler)    
    done()
}

export default userRoutes;
