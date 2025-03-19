import api from "./axios"


const getDietID = async (id: string) => {
    try {
        const response = await api.get(`/diets/${id}`)
        return response.data
    } catch (error) {
        console.error('Erro na requisição:', error)
        throw error
    }
}

export default getDietID


