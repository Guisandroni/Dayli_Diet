import api from "../axios"

interface RegisterDietData {
    name: string
    description: string
    dateCreated: string
    hourCreated: string
    inDiet: 'SIM' | 'NAO'
    id: string
}

export const regiserDietbyUser = async (id: string, data: Omit<RegisterDietData, 'id'>) => {
    if (!id) {
        throw new Error('id is required');
    }
    try {                              
        const requestData = { ...data, id }
        const response = await api.post(`/users/diets/${id}`, requestData)
        return response.data
    } catch (error) {
        console.error('Erro ao registrar dieta:', error)
        throw error
    }
}