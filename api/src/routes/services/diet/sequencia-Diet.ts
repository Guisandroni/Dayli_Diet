import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../../lib/prisma"
import { z } from "zod";

interface Meal {
    id: string;
    name: string;
    dateCreated: string;
    hourCreated: string;
    inDiet: 'SIM' | 'NAO';
}

interface MealsByDate {
    [date: string]: Meal[];
}

interface SequenceStats {
    maxSequence: number;
    currentSequence: number;
    startDate?: string;
    endDate?: string;
}

export const getInDietSequence = async (request: FastifyRequest, reply: FastifyReply) => {
   const paramsUserId = z.object({
    userId: z.string().uuid()
   })
    try {
        const {userId} = paramsUserId.parse(request.params)

        const meals = await prisma.diet.findMany({
            where:{
                userId:userId
            },
            orderBy: [
                { dateCreated: 'asc' },
                { hourCreated: 'asc' }
            ],
            select: {
                dateCreated: true,
                inDiet: true
            }
        });



        let currentSequence = 0;
        let maxSequence = 0;
        let currentStart = '';
        let maxStart = '';
        let maxEnd = '';

        for (const meal of meals) {
            if (meal.inDiet === 'SIM') {
                if (currentSequence === 0) {
                    currentStart = meal.dateCreated;
                }
                currentSequence++;
                if (currentSequence > maxSequence) {
                    maxSequence = currentSequence;
                    maxStart = currentStart;
                    maxEnd = meal.dateCreated;
                }
            } else {
                currentSequence = 0;
            }
        }

        return reply.status(200).send({
            status: 'success',
            data: {
                maxSequence,
                currentSequence: meals[meals.length - 1]?.inDiet === 'SIM' ? currentSequence : 0,
                ...(maxSequence > 0 && {
                    startDate: maxStart,
                    endDate: maxEnd
                })
            } as SequenceStats
        });
    } catch (error) {
        console.error('Erro ao calcular sequência de refeições na dieta:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao calcular sequência de refeições na dieta'
        });
    }
}

export const getNotInDietSequence = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUserId = z.object({
        userId: z.string().uuid()
       })
   
    try {
        const {userId} = paramsUserId.parse(request.params)
        const meals = await prisma.diet.findMany({
            where:{
                userId:userId
            },
            orderBy: [
                { dateCreated: 'asc' },
                { hourCreated: 'asc' }
            ],
            select: {
                dateCreated: true,
                inDiet: true
            }
        });

        let currentSequence = 0;
        let maxSequence = 0;
        let currentStart = '';
        let maxStart = '';
        let maxEnd = '';

        for (const meal of meals) {
            if (meal.inDiet === 'NAO') {
                if (currentSequence === 0) {
                    currentStart = meal.dateCreated;
                }
                currentSequence++;
                if (currentSequence > maxSequence) {
                    maxSequence = currentSequence;
                    maxStart = currentStart;
                    maxEnd = meal.dateCreated;
                }
            } else {
                currentSequence = 0;
            }
        }

        return reply.status(200).send({
            status: 'success',
            data: {
                maxSequence,
                currentSequence: meals[meals.length - 1]?.inDiet === 'NAO' ? currentSequence : 0,
                ...(maxSequence > 0 && {
                    startDate: maxStart,
                    endDate: maxEnd
                })
            } as SequenceStats
        });
    } catch (error) {
        console.error('Erro ao calcular sequência de refeições fora da dieta:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao calcular sequência de refeições fora da dieta'
        });
    }
}

export const OrderByDate = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUserId = z.object({
        userId: z.string().uuid()
       })
    try {
        const {userId} = paramsUserId.parse(request.params)
        const meals = await prisma.diet.findMany({
            where:{
                userId:userId
            },
            orderBy: [
                { dateCreated: 'asc' },
                { hourCreated: 'asc' }
            ],
            select: {
                id: true,
                name: true,
                dateCreated: true,
                hourCreated: true,
                inDiet: true,
                description: true
            }
        });

        // Agrupa refeições por data com estatísticas
        const mealsByDate = meals.reduce<MealsByDate>((acc, meal) => {
            const date = meal.dateCreated;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(meal as Meal);
            return acc;
        }, {});

        // Calcula estatísticas por data
        const result = Object.entries(mealsByDate).map(([date, meals]) => {
            const totalMeals = meals.length;
            const inDietMeals = meals.filter(meal => meal.inDiet === 'SIM').length;
            
            return {
                date,
                meals,
                stats: {
                    total: totalMeals,
                    inDiet: inDietMeals,
                    outDiet: totalMeals - inDietMeals,
                    percentage: Math.round((inDietMeals / totalMeals) * 100)
                }
            };
        });

        return reply.status(200).send({
            status: 'success',
            data: result
        });
    } catch (error) {
        console.error('Erro ao buscar refeições ordenadas por data:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao buscar refeições ordenadas por data'
        });
    }
}