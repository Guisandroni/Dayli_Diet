import api from "../axios"


const getDietID = async (userId: string, id: string) => {
    try {
        const response = await api.get(`/diets/${userId}/${id}`)
        return response.data
    } catch (error) {
        console.error('Erro na requisição:', error)
        throw error
    }
}

export default getDietID


