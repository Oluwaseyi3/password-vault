import fastify, { FastifyRequest , FastifyReply} from "fastify";
import cors from "@fastify/cors";
import { CORS_ORIGIN } from "../src/constants";
import jwt from "@fastify/jwt"
import fs from "fs"
import path from 'path'
import cookie from "@fastify/cookie";
import userRoutes from "../src/modules/user/user.route";
import vaultRoutes from "../src/modules/vault/vault.route";

const createServer = () => {
    const app = fastify()

    app.register(cors, {
        origin: CORS_ORIGIN,
        credentials: true
    }) 

    app.register(jwt, {
        secret: {
            private: fs.readFileSync(`${path.join(process.cwd(), "certs")}/private.key`), 
     
              public: fs.readFileSync(
          `${path.join(process.cwd(), "certs")}/public.key`  
        )
           },

           sign: {algorithm: "RS256"},
         cookie: {
            cookieName: "token",
            signed: false
         }  
    })

    app.register(cookie, {
        parseOptions: {

        }
    })

    app.decorate("authenticate", async(request: FastifyRequest, reply: FastifyReply) => {
        try {
            const user = await request.jwtVerify<{
                _id: string
            }>()

            request.user = user;
        } catch (error) {
            return reply.send(error)
        }
    })

    app.register(userRoutes, {prefix: "api/users"})
    app.register(vaultRoutes, {prefix: "api/vault"})

    return app;

}
 
export default createServer;