import { FastifyReply, FastifyRequest } from "fastify";
import { date, string, z } from "zod";
import { prisma } from "../../lib/prisma";

export const registerDiet = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const statusdiet = z.enum(["SIM", "NAO"]);
  const validadeDietParams = z.object({
    name: string(),
    description: string(),
    hourCreated: string(),
    dateCreated: string(),
    inDiet: statusdiet,
  });

  const { name, description, hourCreated, dateCreated, inDiet } =
    validadeDietParams.parse(request.body);
  const diets = await prisma.diet.create({
    data: {
      name,
      description,
      hourCreated,
      dateCreated,
      inDiet,
    },
  });
  return reply.status(201).send(diets);
};
