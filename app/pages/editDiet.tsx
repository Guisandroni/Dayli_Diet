import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Yorn from '@/components/yorn'
import { useIsFocused } from '@react-navigation/native'

const EditDiet = () => {
  return (
    <View className=' bg-gray-4 h-full '>
      <View className='bg-gray-4 h-10 flex justify-center items-center mt-4'>

        <Text className='text-2xl font-nunito-bold '>Nova Refeição</Text>
        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-2 left-4' />

      </View>
      <StatusBar className='bg-gray-4 ' />

      <View className='h-full bg-white mt-10 w-full  flex flex--col  items-center px-2 '>
        <View className='mt-10 w-full px-8'>
          <Text className='text-xl font-nunito-regular'>Nome</Text>
          <TextInput className='border-gray-4 border px-4 py-3 rounded-lg text-2xl font-nunito-regular' />
        </View>

        <View className='mt-10 w-full  px-8'>
          <Text className='text-xl font-nunito-regular'>Descrição</Text>
          <TextInput
            multiline={true}
            textAlignVertical='top'
            className='border-gray-4 border h-40 px-4  rounded-lg text-2xl font-nunito-regular' />
        </View>

        <View className='flex flex-row  w-full justify-between px-10 mt-10 '>
          <View className=' w-40'>
            <Text className='text-xl font-nunito-regular'>Data</Text>
            <TextInput className='border-gray-4 border px-4 py-3 rounded-lg text-2xl font-nunito-regular' />
          </View>
          <View className=' w-40'>
            <Text className='text-xl font-nunito-regular'>Hora</Text>
            <TextInput className='border-gray-4 border px-4 py-3 rounded-lg text-2xl font-nunito-regular' />
          </View>
        </View>



        <View className='flex flex-col w-full  mt-10 items-center justify-center gap-6'>
          <Text className='text-xl font-nunito-regular text-start'>Está dentro da dieta?</Text>

          <View className='flex flex-row gap-4'>
            <Yorn title='Sim' circle={`bg-green-dark`} bgBorder={`border border-green-dark  bg-green-mid`}/>
            <Yorn title='Não' circle={`bg-red-dark`} bgBorder={`border border-red-dark  bg-red-mid`} />
          </View>



        </View>

        <TouchableOpacity className='mt-20 bg-gray-1  px-24 h-14 rounded-xl flex justify-center items-center'>
          <Text className='text-white text-xl font-nunito-bold'>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditDiet