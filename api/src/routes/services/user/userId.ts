import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export const userId = async (request: FastifyRequest, reply: FastifyReply) => {
 
    const paramsId = z.object({
        id: z.string().uuid(),
        
    })
    const { id } = paramsId.parse(request.params);

  const user = await prisma.user.findUnique({
    where: { id:id },
  });

  if (!user) {
    return reply.status(404).send({ message: "User not found" });
  }



  return reply.status(200).send({ user });
};  
