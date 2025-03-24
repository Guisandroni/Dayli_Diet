import { router } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function YesDietSequence() {
  return (
    <View className="flex items-center justify-center h-full gap-10 bg-white">
        <StatusBar className="bg-white" />
        <View className="flex items-center justify-center gap-2">
        <Text className="text-2xl text-green-400 font-nunito-bold">
            Continue assim!
        </Text>
        <Text className="text-xl font-nunito-regular ">
            Você continua dentro da dieta. Muito bem!
        </Text>
        </View>

        <Image
        resizeMode="contain"
        source={require('../../assets/images/yepsequence.png')} />
        
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