import api from "../axios"

export interface Diet {
    id: string
    name: string
    hourCreated: string
    dateCreated: string
    inDiet: boolean // true para verde, false para vermelho
    description: string
}

// Função para buscar as dietas
const getDiets = async (): Promise<Diet[]> => {
    try {
        const response = await api.get<Diet[]>('/diets')
        console.log('Dados brutos recebidos da API:', JSON.stringify(response.data, null, 2))
        return response.data
    } catch (error) {
        console.error('Erro na requisição:', error)
        throw error
    }   
}

export default getDiets