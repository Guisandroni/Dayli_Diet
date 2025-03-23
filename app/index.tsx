
import { router } from "expo-router";
import { Button, FlatList, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";




export default function Index() {

  return (
   <View className="flex flex-col items-center justify-center h-full gap-4 bg-white">
    <StatusBar barStyle="dark-content" className="bg-white"/>
    <Text className="text-2xl font-bold">Welcome to DailyDiet 🥗</Text>
    <Text className="text-lg font-bold">Your best diet</Text>
    <TouchableOpacity
    className="p-2 bg-blue-500 rounded-md"
    onPress={()=>router.push('/pages/login')} >
      <Text className="text-white">Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
    className="p-2 bg-blue-500 rounded-md"
    onPress={()=>router.push('/pages/register')}>
      <Text className="text-white">Register</Text>
    </TouchableOpacity>
   </View>
  )
}
