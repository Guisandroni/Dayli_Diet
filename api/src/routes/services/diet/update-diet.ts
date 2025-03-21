import { string, z } from "zod"
import { prisma } from "../../../lib/prisma"
import { request } from "http"
import { FastifyReply, FastifyRequest } from "fastify"



export const updateDiet = async (request:FastifyRequest,reply:FastifyReply) =>{

        const statusdiet = z.enum(["SIM", "NAO"]);
        
        const ValidadedDietBody = z.object({
            id : z.string().uuid(),
            userId: z.string().uuid()
        })
        const ValidadeSelect = z.object({
            name: z.string(),
            description: z.string().optional(),
            hourCreated: z.string().optional(),
            dateCreated: z.string().optional(),
            inDiet: statusdiet.optional(),
        })

        const {id,userId} = ValidadedDietBody.parse(request.params)
        const updateData = ValidadeSelect.parse(request.body)
        


        const onlyDiet = await prisma.diet.update({
           where:{
            id:id,
            userId:userId
           } ,
           data:updateData
        })

        if(!onlyDiet){
            return reply.status(404).send({
                message:"Refeição não encontrada"
            })
        }
     

        return reply.status(200).send(onlyDiet)

}