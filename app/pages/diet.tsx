import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import DietStatus from '@/components/diet'
import { useLocalSearchParams } from 'expo-router'

const Diet = () => {
    const params = useLocalSearchParams()
    const id = params.id as string
    const userId = params.userId as string

    useEffect(() => {
        console.log('Diet page params:', { id, userId })
    }, [id, userId])

    if (!id || !userId) {
        return (
            <View className='flex items-center justify-center h-full'>
                <Text>Parâmetros inválidos</Text>
            </View>
        )
    }

    const formattedId = id.trim()
    const formattedUserId = userId.trim()

    return (
        <View className='h-full mt-4 bg-green-mid'>
            <View className='flex items-center justify-center h-20 mt-4 '>
                <Text className='text-2xl font-nunito-bold '>Nova Refeição</Text>
                <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-6 left-4' />
            </View>
            <StatusBar className=' bg-green-mid' />
            <View className='px-10 bg-white'>
                <DietStatus id={formattedId} userId={formattedUserId} />
            </View>
        </View>
    )
}

export default Diet