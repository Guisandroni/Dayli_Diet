import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export const deleteDiet = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const validateDietParams = z.object({
            id: z.string().uuid()
        });

        const { id } = validateDietParams.parse(request.params);

        // Verifica se a refeição existe antes de tentar deletar
        const existingDiet = await prisma.diet.findUnique({
            where: { id }
        });

        if (!existingDiet) {
            return reply.status(404).send({
                status: 'error',
                message: 'Refeição não encontrada'
            });
        }

        await prisma.diet.delete({
            where: { id }
        });

        return reply.status(200).send({
            status: 'success',
            message: 'Refeição removida com sucesso'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                status: 'error',
                message: 'ID inválido',
                details: error.errors
            });
        }

        console.error('Erro ao deletar refeição:', error);
        return reply.status(500).send({
            status: 'error',
            message: 'Erro ao deletar refeição'
        });
    }
}