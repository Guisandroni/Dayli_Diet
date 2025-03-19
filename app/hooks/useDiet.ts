import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import getDietID from '../api/getDietID'
import updateDiet from '../api/updateDiet'

interface Diet {
  id: string
  name: string
  description: string
  hourCreated: string
  dateCreated: string
  inDiet: 'SIM' | 'NAO'
}

interface UpdateDietData {
  name?: string
  description?: string
  inDiet?: 'SIM' | 'NAO'
  hourCreated?: string
  dateCreated?: string
}

export const useDiet = (id: string) => {
  const [diet, setDiet] = useState<Diet | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFocused = useIsFocused()

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

  const updateDietData = async (data: UpdateDietData) => {
    try {
      setLoading(true)
      setError(null)
      const updatedDiet = await updateDiet(id, data)
      setDiet(updatedDiet)
      return updatedDiet
    } catch (err: any) {
      console.error('Erro ao atualizar dieta:', err)
      setError(err.message || 'Erro ao atualizar dieta. Verifique sua conexão.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id && isFocused) {
      fetchDiet()
    }
  }, [id, isFocused])

  return {
    diet,
    loading,
    error,
    fetchDiet,
    updateDiet: updateDietData
  }
} 