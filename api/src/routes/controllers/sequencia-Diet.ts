import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../lib/prisma"

export const  getInDietSequence = async (request:FastifyRequest, reply:FastifyReply) =>{
   
    const OrderDiet = await prisma.diet.findMany({
        orderBy:[ 
            {dateCreated:'asc'},
            {hourCreated:'asc'}
        ]
    })
   let currentSequence = 0
   let  maxSequence = 0

    for (const Diets of OrderDiet){
        if(Diets.inDiet === 'SIM'){
            currentSequence++
            if(currentSequence > maxSequence){
                maxSequence = currentSequence
            } 
        } else if (Diets.inDiet==='NAO'){
            currentSequence = 0
        }
    }


  
    return reply.status(200).send({sequenceCount: maxSequence})

    
}


export const  getNotInDietSequence = async (request:FastifyRequest, reply:FastifyReply) =>{
   
    const OrderDiet = await prisma.diet.findMany({
        orderBy:[ 
            {dateCreated:'asc'},
            {hourCreated:'asc'}
        ]
    })
   let currentSequence = 0
   let  maxSequence = 0

    for (const Diets of OrderDiet){
        if(Diets.inDiet === 'NAO'){
            currentSequence++
            if(currentSequence > maxSequence){
                maxSequence = currentSequence
            } 
        } else if (Diets.inDiet==='SIM'){
            currentSequence = 0
        }
    }


  
    return reply.status(200).send({sequenceCount: maxSequence})

    
}


export const  OrderByDate = async (request:FastifyRequest, reply:FastifyReply) =>{
   
    const OrderDiet = await prisma.diet.findMany({
        orderBy:[ 
            {dateCreated:'asc'},
            {hourCreated:'asc'}
        ]
    })
  
 


  
    return reply.status(200).send({OrderDiet})

    
}