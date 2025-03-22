import { FastifyReply, FastifyRequest } from "fastify";
import { date, string, z } from "zod";
import { prisma } from "../../../lib/prisma";

export const userDiet = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const statusdiet = z.enum(["SIM", "NAO"]);
    const validadeDietParams = z.object({
      name: string(),
      description: string(),
      hourCreated: string(),
      dateCreated: string(),
      inDiet: statusdiet,
      id: z.string(),
    });

    const { name, description, hourCreated, dateCreated, inDiet, id } =
      validadeDietParams.parse(request.body);
    const diets = await prisma.diet.create({
      data: {
        name,
        description,
        hourCreated,
        dateCreated,
        inDiet,
        userId: id,
      },
    });
    return reply.status(201).send(diets);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        status: 'error',
        message: 'Dados inválidos',
        details: error.errors
      });
    }
    
    console.error('Erro ao registrar refeição:', error);
    return reply.status(500).send({
      status: 'error',
      message: 'Erro ao registrar refeição'
    });
  }
};
