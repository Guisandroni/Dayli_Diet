import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../../lib/prisma";

export const users = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany();

  if (!users) {
    return reply.status(404).send({ message: "Users not found" });
  }

  return reply.status(200).send(users);
};

