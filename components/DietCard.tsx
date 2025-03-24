import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Diet } from '@/app/api/diet/getDiets'

const DietCard = ({item} : {item: Diet}) => {
  console.log('DietCard item:', item)
  
  const limitText = (text:string, maxLength:number=40) => {
    return item.name.length > 26 ? item.name.substring(0, 26) + '...' : item.name
  }

  const handleNavigation = () => {
    if (!item.id || !item.userId) {
      console.error('Missing id or userId for navigation')
      return
    }

    const formattedId = item.id.trim()
    const formattedUserId = item.userId.trim()
    
    console.log('Navegando com IDs:', { formattedId, formattedUserId })
    
    router.push({
      pathname: '/pages/diet',
      params: { 
        id: formattedId, 
        userId: formattedUserId 
      }
    })
  }

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      className="flex flex-row"
    >
      <View className="flex flex-row items-center justify-between w-full px-4 border rounded-lg border-zinc-400 h-14">
        <View className="flex flex-row items-center justify-center gap-4">
          <Text className="text-lg">{item.hourCreated}</Text>
          <View className="bg-zinc-400 h-6 min-w-0.5"></View>
          <Text 
            className="text-lg font-light" 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {limitText(item.name)}
          </Text>
        </View>
        <View className={`bg-white-300 w-6 h-6 rounded-full ${item.inDiet ==='SIM' ? 'bg-green-dark' : 'bg-red-dark'}`} />
      </View>
    </TouchableOpacity>
  )
}

export default DietCard