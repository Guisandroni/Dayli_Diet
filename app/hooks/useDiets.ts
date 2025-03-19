import { useEffect, useState } from 'react'
import getDiets, { Diet } from '../api/getDiets'
import deleteDiet from '../api/deleteDiet'
import { useIsFocused } from '@react-navigation/native'

export const useDiets = () => {
  const [diets, setDiets] = useState<Diet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFocused = useIsFocused()

  const fetchDiets = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDiets()
      
      // Mantém os dados originais, apenas garantindo que os campos obrigatórios existam
      const formattedDiets = data.map((diet: Diet) => ({
        id: diet.id || String(Math.random()),
        name: diet.name || 'Dieta sem nome',
        hourCreated: diet.hourCreated, // Mantém a hora original do banco de dados
        dateCreated: diet.dateCreated,
        description: diet.description,
        inDiet: diet.inDiet
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
    try {
      setLoading(true)
      setError(null)
      await deleteDiet(id)
      await fetchDiets() // Recarrega a lista após deletar
    } catch (err: any) {
      console.error('Erro ao deletar dieta:', err)
      setError(err.message || 'Erro ao deletar dieta. Verifique sua conexão.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetchDiets()
    }
  }, [isFocused])

  return {
    diets,
    loading,
    error,
    fetchDiets,
    removeDiet
  }
} 