import api from "../axios"

interface CreateDietData {
  name: string
  description: string
  dateCreated: string
  hourCreated: string
  inDiet: 'SIM' | 'NAO'
}

const createDiet = async (data: CreateDietData) => {
  try {
    const response = await api.post('/diets', data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar dieta:', error)
    throw error
  }
}

export default createDiet 