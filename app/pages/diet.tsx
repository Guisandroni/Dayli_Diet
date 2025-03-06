import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import DietStatus from '@/components/diet'

const Diet = () => {
    return (
        <View className='h-full bg-green-mid '>
            <View className='  h-20 flex justify-center items-center mt-4'>

                <Text className='text-2xl font-nunito-bold '>Nova Refeição</Text>
                <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-2 left-4' />

            </View>

            
            <StatusBar className=' bg-green-mid ' />

           <View className='px-10 bg-white'>
           <DietStatus/>
           </View>
        </View>
    )
}

export default Diet