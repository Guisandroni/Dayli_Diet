import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsUser = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    })
  const { name, email, password } = paramsUser.parse(request.body);

  const userAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userAlreadyExists) {
    return reply.status(400).send({ message: "User already exists" });
  }
  const passwordHash = await hash(password, 10);

  

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash },
  });

  return reply.status(201).send(user);
};      
