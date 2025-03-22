import DietCard from "@/components/DietCard";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, FlatList, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDiets } from "./hooks/useDiets";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getDietSequences, getDietStats } from "./api/diet/getStats";



export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
   <View className="flex flex-col items-center justify-center h-full gap-4">
    <Text className="text-2xl font-bold">Welcome to Daily Diet</Text>
    <Text className="text-lg font-bold">Your best diet</Text>
    <TouchableOpacity
    className="p-2 bg-blue-500 rounded-md"
    onPress={()=>router.push('/pages/login')}   >
      <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
    className="p-2 bg-blue-500 rounded-md"
    onPress={()=>router.push('/pages/register')}>
      <Text>Register</Text>
    </TouchableOpacity>
   </View>
  )
}
