import { useState, useEffect } from "react"
import { getDietsByUser } from "../api/user-diet/DietsByUser"
import { useIsFocused } from "@react-navigation/native"
import { regiserDietbyUser } from "../api/user-diet/registerDiet"

interface RegisterDietData {
    name: string
    description: string
    dateCreated: string
    hourCreated: string
    inDiet: 'SIM' | 'NAO'
    id: string
}

export const useDietbyuser = (userId: string) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [diets, setDiets] = useState<RegisterDietData[]>([])
    const isFocused = useIsFocused()

    const fetchDiets = async () => {
        if (!userId) {
            console.log('ID do usuário não fornecido para buscar dietas');
            setDiets([]);
            return;
        }

        try {
            setLoading(true)
            setError(null)
            console.log('Buscando dietas para o usuário:', userId);
            const response = await getDietsByUser(userId)
            console.log('Resposta da API de dietas:', response);
            
            // Garante que a resposta é um array
            const dietsArray = Array.isArray(response) ? response : response.diets || [];
            console.log('Array de dietas processado:', dietsArray);
            
            // Ordena as dietas por data (mais recente primeiro)
            const sortedDiets = dietsArray.sort((a: RegisterDietData, b: RegisterDietData) => 
                new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
            );
            
            setDiets(sortedDiets)
            return sortedDiets
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar dietas do usuário'
            setError(errorMessage)
            console.error('Erro ao buscar dietas do usuário:', error)
            setDiets([])
            throw error
        } finally {
            setLoading(false)
        }
    }

    const registerDiet = async (data: Omit<RegisterDietData, 'id'>) => {
        if (!userId) {
            console.error('ID do usuário não fornecido para registrar dieta');
            const error = new Error('ID do usuário não fornecido')
            setError(error.message)
            throw error
        }

        try {
            setLoading(true)
            setError(null)
            console.log('Registrando nova dieta com id:', userId);
            // Passa o userId como id no corpo da requisição
            const response = await regiserDietbyUser(userId, data)
            console.log('Resposta do registro:', response);
            
            // Força uma atualização da lista após registrar
            await fetchDiets()
            return response
        } catch (error) {
            console.error('Erro ao registrar dieta:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar dieta'
            setError(errorMessage)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isFocused && userId) {
            console.log('Tela focada, buscando dietas para userId:', userId);
            fetchDiets()
        }
    }, [isFocused, userId])

    return {
        diets,
        loading,
        error,
        fetchDiets,
        registerDiet
    }
}


