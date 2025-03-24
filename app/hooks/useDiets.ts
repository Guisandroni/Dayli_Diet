import { useEffect, useState } from 'react'
import getDiets, { Diet } from '../api/diet/getDiets'
import deleteDiet from '../api/diet/deleteDiet'
import { useIsFocused } from '@react-navigation/native'

export const useDiets = (userId: string) => {
  const [diets, setDiets] = useState<Diet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFocused = useIsFocused()

  const fetchDiets = async () => {
    if (!userId) {
      console.error('UserId não fornecido')
      setError('UserId é obrigatório')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getDiets(userId)
      
      // Mantém os dados originais, apenas garantindo que os campos obrigatórios existam
      const formattedDiets = data.map((diet: Diet) => ({
        id: diet.id || String(Math.random()),
        name: diet.name || 'Dieta sem nome',
        hourCreated: diet.hourCreated,
        dateCreated: diet.dateCreated,
        description: diet.description,
        inDiet: diet.inDiet,
        userId: diet.userId || userId
      }))
      
      console.log('Dietas formatadas:', JSON.stringify(formattedDiets, null, 2))
      setDiets(formattedDiets)
    } catch (err: any) {
      console.error('Erro ao buscar dietas:', err)
      setError(err.message || 'Erro ao buscar dietas. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  const removeDiet = async (id: string) => {
    if (!userId) {
      console.error('UserId não fornecido')
      setError('UserId é obrigatório')
      return
    }

    try {
      setLoading(true)
      setError(null)  
      await deleteDiet(userId, id)
      await fetchDiets()
    } catch (err: any) {
      console.error('Erro ao deletar dieta:', err)
      setError(err.message || 'Erro ao deletar dieta. Verifique sua conexão.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFocused && userId) {
      fetchDiets()
    }
  }, [isFocused, userId])

  return {
    diets,
    loading,
    error,
    fetchDiets,
    removeDiet
  }
} 