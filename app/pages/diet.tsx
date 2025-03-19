import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import DietStatus from '@/components/diet'
import { useDiets } from '../hooks/useDiets'
import { useLocalSearchParams } from 'expo-router'
import { useDiet } from '../hooks/useDiet'
import { ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const Diet = () => {
    const { diets, loading, error, fetchDiets } = useDiets()
    const { id } = useLocalSearchParams()
    const isFocused = useIsFocused()

    useEffect(() => {
      if (isFocused) {
        fetchDiets()
      }
    }, [isFocused])

    return (
        <View className='h-full bg-green-mid '>
            <View className='flex items-center justify-center h-20 mt-4 '>
                <Text className='text-2xl font-nunito-bold '>Nova Refeição</Text>
                <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-2 left-4' />
            </View>
            <StatusBar className=' bg-green-mid' />
            <View className='px-10 bg-white'>
                <DietStatus item={diets} />
            </View>
        </View>
    )
}

export default Diet