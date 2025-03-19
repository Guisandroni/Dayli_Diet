import { useState, useEffect } from 'react'
import getDietID from '../api/getDietID'

interface Diet {
  id: string
  name: string
  description: string
  hourCreated: string
  dateCreated: string
  inDiet: 'SIM' | 'NÃO'
}

export const useDiet = (id: string) => {
  const [diet, setDiet] = useState<Diet | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDiet = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDietID(id)
      setDiet(data)
    } catch (err: any) {
      console.error('Erro ao buscar dieta:', err)
      setError(err.message || 'Erro ao buscar dieta. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDiet()
    }
  }, [id])

  return {
    diet,
    loading,
    error,
    fetchDiet
  }
} 