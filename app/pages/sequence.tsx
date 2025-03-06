import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Sequence = () => {
  return (
    <View className='h-full bg-green-mid '>
        <View className='bg-green-mid h-40 flex flex-col justify-center items-center relative'>

            <Text className='font-nunito-bold text-4xl'>90,86%</Text>
            <Text className='text-xl font-nunito-regular'>das refeições dentro da dieta</Text>
            <AntDesign onPress={()=>router.back()} name="arrowleft" size={24} color="green" className='absolute top-2 left-4'/>
        </View>
        <StatusBar className='bg-green-mid' />

        <View className='flex flex-col items-center bg-gray-100 rounded-t-3xl px-4 h-full gap-10 '>
            <Text className='mt-10 font-nunito-bold text-xl'>Estatísticas gerais</Text>
            <View className='bg-gray-5 flex flex-col justify-center items-center px-4 py-6 w-full rounded-xl'>
                    <Text className='font-nunito-bold text-4xl'>22</Text>
                    <Text className=' font-nunito-regular'>Melhor sequencia de pratos dentro da dieta</Text>
            </View>

            <View className='bg-gray-5 flex flex-col justify-center items-center px-4 py-6 w-full rounded-xl'>
                    <Text className='font-nunito-bold text-4xl'>22</Text>
                    <Text className=' font-nunito-regular'>Melhor sequencia de pratos dentro da dieta</Text>
            </View>

            <View className='flex flex-row gap-4  justify-center w-full px-4'>
                <View className='bg-green-mid  rounded-xl flex flex-col items-center justify-center h-40 w-40 px-4 '>
                <Text className='font-nunito-bold text-2xl'>22</Text>
                <Text className=' font-nunito-regular text-lg text-center'>refeições dentro  da dieta</Text>
                </View>
                <View className='bg-red-mid  rounded-xl flex flex-col items-center justify-center h-40 w-40 px-4  '>
                <Text className='font-nunito-bold text-2xl'>22</Text>
                <Text className=' font-nunito-regular text-lg text-center'>refeições dentro da dieta</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Sequence