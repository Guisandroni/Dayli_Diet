import api from "../axios"

interface CreateDietData {
  name: string
  description: string
  dateCreated: string
  hourCreated: string
  inDiet: 'SIM' | 'NAO'
  userId: string
}

export const createDiet = async (userId: string, data: CreateDietData) => {
  if (!userId) {
    throw new Error('UserId is required');
  }
  try {
    const response = await api.post(`/diets/user/${userId}`, data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar dieta:', error)
    throw error
  }
}

