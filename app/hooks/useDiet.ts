import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import getDietID from '../api/diet/getDietID'
import updateDiet from '../api/diet/updateDiet'

interface Diet {
  id: string
  name: string
  description: string
  hourCreated: string
  dateCreated: string
  inDiet: 'SIM' | 'NAO'
  userId:string
}

interface UpdateDietData {
  name?: string
  description?: string
  inDiet?: 'SIM' | 'NAO'
  hourCreated?: string
  dateCreated?: string
}

export const useDiet = (id: string, userId: string) => {
  const [diet, setDiet] = useState<Diet | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFocused = useIsFocused()

  const fetchDiet = async () => {
    if (!id || !userId) {
      console.error('ID ou userId não fornecidos')
      setError('ID ou userId não fornecidos')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const formattedId = id.trim()
      const formattedUserId = userId.trim()
      
      console.log('Buscando dieta com IDs:', { formattedId, formattedUserId })
      
      const data = await getDietID(formattedUserId, formattedId)
      setDiet(data)
    } catch (err: any) {
      console.error('Erro ao buscar dieta:', err)
      setError(err.message || 'Erro ao buscar dieta. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  const updateDietData = async (data: UpdateDietData) => {
    if (!id || !userId) {
      console.error('ID ou userId não fornecidos')
      setError('ID ou userId não fornecidos')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Garante que os IDs estão no formato correto
      const formattedId = id.trim()
      const formattedUserId = userId.trim()
      
      const updatedDiet = await updateDiet(formattedUserId, formattedId, data)
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