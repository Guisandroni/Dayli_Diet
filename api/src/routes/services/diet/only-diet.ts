import { string, z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"



export const onlyDiet = async (request:FastifyRequest,reply:FastifyReply) =>{
        const ValidadedDietBody = z.object({
            id : string().uuid(),
            userId:string().uuid()
        })

        const {id,userId} = ValidadedDietBody.parse(request.params)
       

        const onlyDiet = await prisma.diet.findUnique({
           where:{
            id:id,
            userId:userId
           }
           
        })

        return reply.status(200).send(onlyDiet)
}