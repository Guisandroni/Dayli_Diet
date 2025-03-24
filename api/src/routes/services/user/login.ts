import { FastifyReply } from "fastify"
import { prisma } from "../../../lib/prisma"
import { FastifyRequest } from "fastify"
import { z } from "zod"
import { compare } from "bcryptjs"

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
const paramsLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
   
    const { email, password } = paramsLogin.parse(request.body)
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return reply.status(401).send({ message: 'Usuário não encontrado' })
    }   

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
        return reply.status(401).send({ message: 'Senha inválida' })
    }   

    const { password: _, ...userWithoutPassword } = user
    return reply.status(200).send(userWithoutPassword)
}
    
