import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../../lib/prisma"
import { z } from "zod";

interface DietStats {
    count: number;
    type: 'in-diet' | 'out-diet' | 'total';
    percentage?: number;
}


export const SimDiet = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUserId = z.object({
        userId: z.string().uuid()
    })
  
    try {
        const {userId} = paramsUserId.parse(request.params)
        const count = await prisma.diet.count({
            where: {
                inDiet: "SIM",
                userId: userId
            }
        });

        const total = await prisma.diet.count({
            where:{
                userId:userId
            }
        });
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

        return reply.status(200).send({
            status: 'success',
            data: {
                count,
                type: 'in-diet',
                percentage
            } as DietStats
        });
    } catch (error) {
        console.error('Erro ao buscar refeições na dieta:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao buscar refeições na dieta'
        });
    }
}

export const NaoDiet = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUserId = z.object({
        userId: z.string().uuid()
    })
   
    try {
        const {userId} = paramsUserId.parse(request.params)
        const count = await prisma.diet.count({
            where: {
                inDiet: "NAO",
                userId:userId
            }
        });

        const total = await prisma.diet.count({
            where:{
                userId:userId
            }
        });
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

        return reply.status(200).send({
            status: 'success',
            data: {
                count,
                type: 'out-diet',
                percentage
            } as DietStats
        });
    } catch (error) {
        console.error('Erro ao buscar refeições fora da dieta:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao buscar refeições fora da dieta'
        });
    }
}

export const AllDiet = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUserId = z.object({
        userId: z.string().uuid()
    })
    
    try {
        const {userId} = paramsUserId.parse(request.params)
        const total = await prisma.diet.count({
            where:{
                userId:userId
            }
        });
        const inDietCount = await prisma.diet.count({ where: { inDiet: "SIM",userId:userId } });
        const outDietCount = await prisma.diet.count({ where: { inDiet: "NAO",userId:userId } });

        return reply.status(200).send({
            status: 'success',
            data: {
                total,
                inDiet: {
                    count: inDietCount,
                    percentage: total > 0 ? Math.round((inDietCount / total) * 100) : 0
                },
                outDiet: {
                    count: outDietCount,
                    percentage: total > 0 ? Math.round((outDietCount / total) * 100) : 0
                }
            }
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas das refeições:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao buscar estatísticas das refeições'
        });
    }
}