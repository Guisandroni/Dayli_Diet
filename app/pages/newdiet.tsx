import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Yorn from '@/components/yorn'
import createDiet from '../api/diet/createDiet'

const NewDiet = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateCreated: '',
    hourCreated: '',
    inDiet: '' as 'SIM' | 'NAO'
  })

  const handleCreate = async () => {
    try {
      if (!formData.name || !formData.description || !formData.dateCreated || !formData.hourCreated || !formData.inDiet) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos')
        return
      }

      await createDiet(formData)
      router.back()
    } catch (error) {
      Alert.alert('Atenção', 'Não foi possível criar a refeição')
    }
  }

  return (
    <View className='h-full bg-gray-4'>
      <View className='flex items-center justify-center h-10 mt-4 bg-gray-4'>
        <Text className='text-2xl font-nunito-bold'>Nova Refeição</Text>
        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-2 left-4' />
      </View>
      <StatusBar className='bg-gray-4' />

      <View className='flex items-center w-full h-full px-2 mt-10 bg-white flex--col'>
        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Nome</Text>
          <TextInput 
            className='px-4 py-3 text-2xl border rounded-lg border-gray-4 font-nunito-regular'
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
          />
        </View>

        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Descrição</Text>
          <TextInput
            multiline={true}
            textAlignVertical='top'
            className='h-40 px-4 text-2xl border rounded-lg border-gray-4 font-nunito-regular'
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({...prev, description: text}))}
          />
        </View>

        <View className='flex flex-row justify-between w-full px-10 mt-10'>
          <View className='w-40'>
            <Text className='text-xl font-nunito-regular'>Data</Text>
            <TextInput 
              className='px-4 py-3 text-2xl border rounded-lg border-gray-4 font-nunito-regular'
              value={formData.dateCreated}
              onChangeText={(text) => setFormData(prev => ({...prev, dateCreated: text}))}
            />
          </View>
          <View className='w-40'>
            <Text className='text-xl font-nunito-regular'>Hora</Text>
            <TextInput 
              className='px-4 py-3 text-2xl border rounded-lg border-gray-4 font-nunito-regular'
              value={formData.hourCreated}
              onChangeText={(text) => setFormData(prev => ({...prev, hourCreated: text}))}
            />
          </View>
        </View>

        <View className='flex flex-col items-center justify-center w-full gap-6 mt-10'>
          <Text className='text-xl font-nunito-regular text-start'>Está dentro da dieta?</Text>

          <View className='flex flex-row gap-4'>
            <Yorn 
              title='Sim' 
              circle={`bg-green-dark`} 
              bgBorder={`border border-green-dark ${formData.inDiet === 'SIM' ? 'bg-green-mid' : 'bg-white'}`}
              onPress={() => setFormData(prev => ({...prev, inDiet: 'SIM'}))}
            />
            <Yorn 
              title='Não' 
              circle={`bg-red-dark`} 
              bgBorder={`border border-red-dark ${formData.inDiet === 'NAO' ? 'bg-red-mid' : 'bg-white'}`}
              onPress={() => setFormData(prev => ({...prev, inDiet: 'NAO'}))}
            />
          </View>
        </View>

        <TouchableOpacity 
          className='flex items-center justify-center px-24 mt-20 bg-gray-1 h-14 rounded-xl'
          onPress={handleCreate}
        >
          <Text className='text-xl text-white font-nunito-bold'>Cadastrar Refeição</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NewDiet