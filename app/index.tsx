import { router } from "expo-router";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function Index() {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../assets/images/backgroundhome.jpg')}
      className="w-full h-full">
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        className="flex-1"
      >
        
        <View className="absolute top-16 left-0 right-0 flex items-center">
          <View className="flex-row items-center bg-white/90 px-6 py-3 rounded-full">
            <Text className="text-3xl font-bold">Daily</Text>
            <Text className="text-3xl font-bold text-green-500">Diet</Text>
            <Image 
              source={require('../assets/images/logo-icon.png')} 
              className="w-8 h-8 ml-2"
            />
          </View>
        </View>

        <View className="flex-1 justify-end pb-10">
          <View className="bg-white/95 mx-6 p-8 rounded-3xl">
            <Text className="text-3xl font-bold text-center mb-4">
              Bem-vindo ao DailyDiet
            </Text>
            <Text className="text-center text-gray-600 mb-8 text-lg">
              Transforme sua saúde através de escolhas alimentares conscientes
            </Text>

            <TouchableOpacity
              className="bg-green-500 rounded-xl mb-4 overflow-hidden"
              onPress={() => router.push('/pages/login')}
            >
              <LinearGradient
                colors={['#22C55E', '#16A34A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-6 py-4 flex-row items-center justify-center"
              >
                <Text className="text-white text-lg font-bold mr-2">Entrar</Text>
                <Feather name="log-in" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white border-2 border-green-500 rounded-xl overflow-hidden"
              onPress={() => router.push('/pages/register')}
            >
              <View className="px-6 py-4 flex-row items-center justify-center">
                <Text className="text-green-500 text-lg font-bold mr-2">Criar conta</Text>
                <Feather name="user-plus" size={20} color="#22C55E" />
              </View>
            </TouchableOpacity>

            <Text className="text-center text-gray-500 mt-6 text-sm">
              Comece sua jornada para uma vida mais saudável hoje
            </Text>
          </View>
        </View>

        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      </LinearGradient>
    </ImageBackground>
  );
}
