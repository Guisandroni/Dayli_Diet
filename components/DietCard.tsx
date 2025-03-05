import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const DietCard = ({hour,name,styleCicle} : {hour:string,name:string,styleCicle:any}) => {
  return (
    <TouchableOpacity className="flex  flex-row">
          <View className="flex flex-row border border-zinc-400 rounded-lg w-full h-14 justify-between items-center px-4">
            <View className="flex flex-row items-center justify-center gap-4">
            <Text className="text-lg ">{hour}</Text>
            <View className="bg-zinc-400 h-6 min-w-0.5"></View>
            <Text className="font-light text-lg">{name}</Text>
            </View>
            <View className={`bg-white-300 w-6 h-6  ${styleCicle} rounded-full`}></View>
          </View>
        </TouchableOpacity>
  )
}

export default DietCard