import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { getDietStats, getDietSequences } from '../api/getStats'
import { useIsFocused } from '@react-navigation/native'

const Sequence = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [sequences, setSequences] = useState<any>(null)
  const isFocused = useIsFocused()

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsData, sequencesData] = await Promise.all([
        getDietStats(),
        getDietSequences()
      ])
      setStats(statsData)
      setSequences(sequencesData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadData()
    }
  }, [isFocused])

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-green-mid">
        <ActivityIndicator size="large" color="#00875F" />
      </View>
    )
  }
  const porcentagem = stats?.inDiet?.percentage?.toFixed(2)
  return (
    <View className={`h-full ${porcentagem > 50 ? 'bg-green-mid' : 'bg-red-mid'}`}>
      <View className={`relative flex flex-col items-center justify-center h-40 ${porcentagem > 50 ? 'bg-green-mid' : 'bg-red-mid'}`}>
        <Text className='text-4xl font-nunito-bold'>{porcentagem}%</Text>
        <Text className='text-xl font-nunito-regular'>das refeições dentro da dieta</Text>
        <AntDesign 
          onPress={() => router.back()} 
          name="arrowleft" 
          size={24} 
          color="green" 
          className='absolute top-2 left-4'
        />
      </View>
      <StatusBar className={` ${porcentagem > 50 ? 'bg-green-mid' : 'bg-red-mid'}`} />

      <View className='flex flex-col items-center h-full gap-10 px-4 bg-gray-100 rounded-t-3xl'>
        <Text className='mt-10 text-xl font-nunito-bold'>Estatísticas gerais</Text>
        
        <View className='flex flex-col items-center justify-center w-full px-4 py-6 bg-gray-5 rounded-xl'>
          <Text className='text-4xl font-nunito-bold'>{sequences?.inDietSequence}</Text>
          <Text className='font-nunito-regular'>Melhor sequência de pratos dentro da dieta</Text>
        </View>

        <View className='flex flex-col items-center justify-center w-full px-4 py-6 bg-gray-5 rounded-xl'>
          <Text className='text-4xl font-nunito-bold'>{stats?.total?.count}</Text>
          <Text className='font-nunito-regular'>Total de refeições registradas</Text>
        </View>

        <View className='flex flex-row justify-center w-full gap-4 px-4'>
          <View className='flex flex-col items-center justify-center w-40 h-40 px-4 bg-green-mid rounded-xl'>
            <Text className='text-2xl font-nunito-bold'>{stats?.inDiet?.count}</Text>
            <Text className='text-lg text-center font-nunito-regular'>refeições dentro da dieta</Text>
          </View>
          <View className='flex flex-col items-center justify-center w-40 h-40 px-4 bg-red-mid rounded-xl'>
            <Text className='text-2xl font-nunito-bold'>{stats?.outDiet?.count}</Text>
            <Text className='text-lg text-center font-nunito-regular'>refeições fora da dieta</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Sequence