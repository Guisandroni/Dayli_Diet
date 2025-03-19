import { useState } from 'react'
import getDiets, { Diet } from '../api/getDiets'

export const useDiets = () => {
  const [diets, setDiets] = useState<Diet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return {
    diets,
    loading,
    error,
    fetchDiets
  }
} 