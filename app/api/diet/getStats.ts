import api from "../axios"

interface DietStats {
  inDiet: {
    count: number;
    percentage: number;
  };
  outDiet: {
    count: number;
    percentage: number;
  };
  total: number;
}

interface SequenceStats {
  maxSequence: number
  currentSequence: number
  startDate?: string
  endDate?: string
}

export const getDietStats = async (userId: string) => {
  if (!userId) {
    throw new Error('UserId is required');
  }
  try {
    // Busca todas as estatísticas de uma vez
    const response = await api.get(`/diets/stats/total/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
}

export const getDietSequences = async (userId: string) => {
  if (!userId) {
    throw new Error('UserId is required');
  }
  try {
    const response = await api.get(`/diets/ordered/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar sequências:', error);
    throw error;
  }
} 