import api from "../axios"

interface RegisterDietData {
    name: string
    description: string
    dateCreated: string
    hourCreated: string
    inDiet: 'SIM' | 'NAO'
    id: string
}

export const regiserDietbyUser = async( data: RegisterDietData) =>{
    try {
        const response = await api.post(`/users/diets/${data.id}`, data)
        return response.data
    } catch (error) {
        console.error('Erro ao registrar dieta:', error)
        throw error
    }
}