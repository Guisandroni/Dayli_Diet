import { string, z } from "zod"
import { prisma } from "../../lib/prisma"
import { request } from "http"
import { FastifyReply, FastifyRequest } from "fastify"



export const deleteDiet = async (request:FastifyRequest,reply:FastifyReply) =>{

        
        const ValidadedDietBody = z.object({
            id : z.string().uuid()
        })
       

        const {id} = ValidadedDietBody.parse(request.params)
        


        const onlyDiet = await prisma.diet.delete({
           where:{
            id:id
           } 
        })

     

        return reply.status(200).send(onlyDiet)

}