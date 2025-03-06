import { FastifyReply, FastifyRequest } from "fastify"
import {date, nativeEnum, string, z} from 'zod'
import { prisma } from "../../lib/prisma"

export const  SimDiet = async (request:FastifyRequest, reply:FastifyReply) =>{
   

    return await prisma.diet.count({
        where:{
            inDiet: "SIM"
        }
    })

    
}

export const  NaoDiet = async (request:FastifyRequest, reply:FastifyReply) =>{
   

    return await prisma.diet.count({
        where:{
            inDiet: "NAO"
        }
    })

    
}



export const  AllDiet = async (request:FastifyRequest, reply:FastifyReply) =>{
   

    return await prisma.diet.count()

    
}