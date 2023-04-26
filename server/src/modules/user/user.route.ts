import { FastifyError, FastifyInstance, FastifyPluginOptions} from "fastify"

const userRoutes = (
    app: FastifyInstance,
     _: FastifyPluginOptions,
      done: (err?: FastifyError) => void
     ) =>{
    done()
}

export default userRoutes;
