import { View, Text } from 'react-native'
import React from 'react'
import { api } from './api/api'

const Testapi = async () => {
   
  const response = await api.get('/',{
    params:{
      
    }
  })
  return (
    <View>
      <Text>Testapi</Text>
    </View>
  )
}

export default Testapi