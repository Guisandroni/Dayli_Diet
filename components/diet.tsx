import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { dietDatasecond } from '@/seed/constraints'
import { router } from 'expo-router'
import { DeleteDiet } from './deleteDiet'

const DietStatus = () => {
    const item = dietDatasecond[0]
    const [modal,setModal] = useState(false)

    return (
        <View className='h-full bg-white   flex flex-col justify-between pb-40  '>
           <View>
           <View className=' mt-10 gap-2'>
                <Text className='text-xl font-nunito-bold'>{item.name}</Text>
                <Text className='text-lg font-nunito-regular'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aperiam facilis, illo voluptatum molestiae, ducimus libero corrupti explicabo expedita reprehenderit ullam, esse voluptatem nulla officiis repudiandae consectetur magni dignissimos ut!</Text>

            </View>
            <View className='mt-10 gap-2'>
            <Text className='text-xl font-nunito-bold'>Data e hora</Text>
            <Text className='text-xl font-nunito-regular'>{item.hour} ás {item.hour}</Text>
            </View>

            <View className=' mt-10 flex flex-row items-center justify-center rounded-full gap-4 bg-gray-5 w-40 px-6 py-2'>
                <View className='h-4 w-4 rounded-full bg-red-dark'></View>
                <Text>fora da dieta</Text>
            </View>
           </View>

            <View className='flex flex-col justify-center items-center gap-6 mt-10'>
                <TouchableOpacity 
                    onPress={()=>router.push('/pages/editDiet')}
                    className='bg-gray-1 w-full p-5 flex justify-center items-center rounded-xl'
                >
                    <Text className='text-white font-nunito-bold text-xl'>Editar refeição</Text>
                </TouchableOpacity>
               
                <TouchableOpacity 
                    onPress={()=> setModal(true)}
                    className='bg-white border-2 border-gray-1 w-full p-5 flex justify-center items-center rounded-xl'
                >
                    <Text className='text-black font-nunito-bold text-xl'>Excluir refeição</Text>
                </TouchableOpacity>

                <DeleteDiet modal={modal} setModal={setModal} />
            </View>
        </View>
    )
}

export default DietStatus