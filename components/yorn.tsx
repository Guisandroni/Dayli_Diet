import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface YornProps {
  title: string
  circle: string
  bgBorder: string
  onPress: () => void
}

const Yorn = ({ title, circle, bgBorder, onPress }: YornProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgBorder} bg-gray-6 h-20 w-44 rounded-xl flex flex-row justify-center items-center gap-4`}
    >
      <View className={`h-4 w-4 rounded-full ${circle}`}></View>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default Yorn