import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { dietDatasecond } from '@/seed/constraints'
import { router, useLocalSearchParams } from 'expo-router'
import { DeleteDiet } from './deleteDiet'
import { useDiet } from '@/app/hooks/useDiet'
import { Diet } from '@/app/api/diet/getDiets'
import { useDiets } from '@/app/hooks/useDiets'

const DietStatus = ({ item }: { item: any }) => {
    const [modal, setModal] = useState(false)
    const { id, userId } = useLocalSearchParams()
    const { diet } = useDiet(id as string, userId as string)
    console.log(diet)
   


  
    return (
        <View className='flex flex-col justify-between h-full pb-40 bg-white '>
            <View>
                <View className='gap-2 mt-10 '>
                    <Text className='text-xl font-nunito-bold'>{diet?.name}</Text>
                    <Text className='text-lg font-nunito-regular'>{diet?.description}</Text>

                </View>
                <View className='gap-2 mt-10'>
                    <Text className='text-xl font-nunito-bold'>Data e hora</Text>
                    <Text className='text-xl font-nunito-regular'>{diet?.dateCreated} ás {diet?.hourCreated}</Text>
                </View>
                <View className='flex flex-row items-center justify-center w-40 gap-4 px-6 py-2 mt-10 rounded-full bg-gray-5'>
                    <View className={`w-4 h-4 rounded-full ${diet?.inDiet === 'SIM' ? 'bg-green-dark' : 'bg-red-dark'}`}></View>
                    <Text>{diet?.inDiet === 'SIM' ? 'Dentro da dieta' : 'Fora da dieta'}</Text>
                </View>
            </View>

            <View className='flex flex-col items-center justify-center gap-6 mt-10'>
                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/pages/editDiet',
                        params: { id: diet?.id, userId: diet?.userId }
                    })}
                    className='flex items-center justify-center w-full p-5 bg-gray-1 rounded-xl'
                >
                    <Text className='text-xl text-white font-nunito-bold'>Editar refeição</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModal(true)}
                    className='flex items-center justify-center w-full p-5 bg-white border-2 border-gray-1 rounded-xl'
                >
                    <Text className='text-xl text-black font-nunito-bold'>Excluir refeição</Text>
                </TouchableOpacity>

                <DeleteDiet item={diet} modal={modal} setModal={setModal} />
            </View>
        </View>
    )
}

export default DietStatus