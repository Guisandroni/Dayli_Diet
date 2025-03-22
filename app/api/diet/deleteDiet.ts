import api from "../axios"

const deleteDiet = async (userId: string, id: string) => {
  try {
    const response = await api.delete(`/diets/${userId}/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao deletar dieta:', error)
    throw error
  }
}

export default deleteDiet 