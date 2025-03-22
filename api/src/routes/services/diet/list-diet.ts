import { FastifyReply, FastifyRequest } from "fastify"
import {date, nativeEnum, string, z} from 'zod'
import { prisma } from "../../../lib/prisma"

export const listDiet = async (request:FastifyRequest, reply:FastifyReply) =>{
   

    return await prisma.diet.findMany()

    
}