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

    const fetchDiets = async () => {
        if (!userId) {
            console.log('ID do usuário não fornecido');
            setDiets([]);
            return;
        }

        try {
            setLoading(true)
            setError(null)
            const response = await getDietsByUser(userId)
            console.log('Resposta da API de dietas:', response);
            
            // Garante que a resposta é um array
            const dietsArray = Array.isArray(response) ? response : response.diets || [];
            console.log('Array de dietas processado:', dietsArray);
            
            setDiets(dietsArray)
            return dietsArray
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

    const registerDiet = async (data: RegisterDietData) => {
        try {
            setLoading(true)
            const response = await regiserDietbyUser(data)
            await fetchDiets() // Atualiza a lista após registrar nova dieta
            return response
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar dieta'
            setError(errorMessage)
            console.error('Erro ao registrar dieta:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        diets,
        loading,
        error,
        fetchDiets,
        registerDiet
    }
}


