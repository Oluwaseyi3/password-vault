import { FastifyReply, FastifyRequest } from "fastify";
import { get } from "lodash";
import {updateVault} from "./vault.service"
import { logger } from "@typegoose/typegoose/lib/logSettings";

export async function updateVaultHandler(
    request: FastifyRequest<{
        Body: {
            encryptedValue: string;
        }
    }>,
    reply : FastifyReply
) {
    const userId = get(request, "user._id")
    try {
        await updateVault({
            data: request.body.encryptedValue,
            userId,
        })

        return reply.code(200).send("Vault updated")
    } catch (error) {
      logger.error(error, "error updating vault")  
      return reply.code(500).send(error)   
    }
}