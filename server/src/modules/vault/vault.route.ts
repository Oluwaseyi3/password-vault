import { FastifyError, FastifyInstance, FastifyPluginOptions} from "fastify"

const vaultRoutes = (
    app: FastifyInstance,
     _: FastifyPluginOptions,
      done: (err?: FastifyError) => void
     ) =>{
    done()
}

export default vaultRoutes;
