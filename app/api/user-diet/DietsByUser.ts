import api from "../axios"

export const getDietsByUser = async (id: string) => {
    if (!id) {
        console.log('ID não fornecido para busca de dietas');
        return [];
    }

    try {
        console.log('Buscando dietas para o usuário:', id);
        const response = await api.get(`/users/diets/user/${id}`);
        console.log('Resposta da API:', response.data);
        
        const diets = Array.isArray(response.data) ? response.data : response.data.diets || [];
        return diets;
    } catch (error) {
        console.error('Erro ao buscar dietas do usuário:', error);
        throw error;
    }
}


