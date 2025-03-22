import api from "../axios"

interface UpdateDietData {
  name?: string
  description?: string
  dateCreated?: string
  hourCreated?: string
  inDiet?: 'SIM' | 'NAO'
}

const updateDiet = async (userId: string, id: string, data: UpdateDietData) => {
  try {
    const response = await api.put(`/diets/${userId}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar dieta:', error)
    throw error
  }
}

export default updateDiet 