import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const DietCard = ({item} : {item:any}) => {
  const limitText = (text:string, maxLength:number=40) => {
    return item.name.length > 26 ? item.name.substring(0, 26) + '...' : item.name
  }

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/pages/diet',
        params: { id: item.id, userId: item.userId }
      })}
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
        <View className={`bg-white-300 w-6 h-6 rounded-full ${item.inDiet==='SIM' ? 'bg-green-dark' : 'bg-red-dark'}`} />
      </View>
    </TouchableOpacity>
  )
}

export default DietCard