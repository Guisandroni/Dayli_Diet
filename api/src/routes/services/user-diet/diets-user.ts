import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../../lib/prisma"
import { z } from "zod"


export const dietsUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramUserDiet = z.object({
        id: z.string(),
    })
    const {id} = paramUserDiet.parse(request.params)

    const diets = await prisma.diet.findMany({
        where: {userId: id}
    })

    if(!diets){
        return reply.status(404).send({message: "Dieta não encontrada"})
    }

    return reply.status(200).send({diets})
}