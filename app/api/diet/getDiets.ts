import api from "../axios"

export interface Diet {
    id: string
    name: string
    hourCreated: string
    dateCreated: string
    inDiet?: 'SIM' | 'NAO'
    description: string
    userId: string
}

// Função para buscar as dietas
const getDiets = async (userId: string): Promise<Diet[]> => {
    if (!userId) {
        throw new Error('UserId is required');
    }
    try {
        const response = await api.get<Diet[]>(`/diets/user/${userId}`)
        console.log('Dados brutos recebidos da API:', JSON.stringify(response.data, null, 2))
        return response.data
    } catch (error) {
        console.error('Erro na requisição:', error)
        throw error
    }   
}

export default getDiets