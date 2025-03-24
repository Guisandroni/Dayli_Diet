import { router } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function NotDietSequence() {
  return (
    <View className="flex items-center justify-center h-full gap-10 px-4 bg-white">
        <StatusBar className="bg-white" />
        <View className="flex items-center justify-center gap-2 px-6">
        <Text className="text-2xl text-red-400 font-nunito-bold">
           Que pena!
        </Text>
        <Text className="text-xl text-center font-nunito-regular">
            Você saiu da dieta dessa vez, mas continue se esforçando e não desista!
        </Text>
        </View>

        <Image
        resizeMode="contain"
        source={require('../../assets/images/notsequence.png')} />
        
        <TouchableOpacity
        onPress={()=>router.replace('/pages/home')}
        className='flex items-center justify-center px-24 mt-20 bg-gray-1 h-14 rounded-xl'
        >
            <Text className="text-white">
                Ir para a página inicial
            </Text>
        </TouchableOpacity>
    </View>
  )
}