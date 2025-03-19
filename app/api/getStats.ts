import api from "./axios"

interface DietStats {
  count: number
  percentage?: number
}

interface SequenceStats {
  maxSequence: number
  currentSequence: number
  startDate?: string
  endDate?: string
}

export const getDietStats = async () => {
  try {
    const [inDiet, outDiet] = await Promise.all([
      api.get('/diets/stats/in-diet'),
      api.get('/diets/stats/out-diet')
    ])

    const inDietData = inDiet.data.data as DietStats
    const outDietData = outDiet.data.data as DietStats
    const totalCount = inDietData.count + outDietData.count

    return {
      inDiet: inDietData,
      outDiet: outDietData,
      total: { count: totalCount }
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    throw error
  }
}

export const getDietSequences = async () => {
  try {
    const [inDietSeq, outDietSeq] = await Promise.all([
      api.get('/diets/sequence/in-diet'),
      api.get('/diets/sequence/out-diet')
    ])

    return {
      inDietSequence: (inDietSeq.data.data as SequenceStats).maxSequence,
      outDietSequence: (outDietSeq.data.data as SequenceStats).maxSequence
    }
  } catch (error) {
    console.error('Erro ao buscar sequências:', error)
    throw error
  }
} 