import DietCard from "@/components/DietCard";
import { dietData, dietDatasecond } from "@/seed/constraints";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  

  return (
    <SafeAreaView
      className="h-full px-6 py-8 bg-gray-100 "
    >
      <StatusBar className="bg-gray-100"/>
      <ScrollView
        contentContainerClassName="pb-40"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row justify-between items-center ">
          <View className="flex flex-col gap-4  items-center">
           
            <Text className="font-nunito-bold text-3xl ">Daily Diet</Text>
          </View>
        
          <TouchableOpacity  
            className="bg-black w-12 h-12 rounded-full"
          onPress={()=>router.push('/testapi')}>
         
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center bg-green-mid py-6 rounded-xl relative mt-10">
          <Text className="text-center text-4xl font-bold">90,86% {'\n'}
            <Text  className="text-xl font-light">das refeições dentro da dieta</Text>
          </Text>
          
          <MaterialCommunityIcons onPress={()=>router.push('/pages/sequence')} name="arrow-top-right" size={24} color="green" className="absolute right-6 top-2" />

        </View>

        <View className="mt-10 flex flex-col gap-4 items-start">
          <Text className="text-xl">Refeições</Text>
          <TouchableOpacity 
          onPress={()=>router.push('/pages/newdiet')}
          className="bg-gray-1 w-full h-16 rounded-xl flex flex-row items-center justify-center gap-6">
            <AntDesign name="plus" size={22} color="white" className="font-bold" />
            <Text className="text-white text-xl">Nova refeição</Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-start mt-10 gap-4">
          <Text className="text-2xl font-bold">02.03.25</Text>

          <FlatList
            contentContainerClassName="flex mt-2 gap-4"
            data={dietData}
            renderItem={({ item }) => <DietCard key={item.id} hour={item.hour} styleCicle={item.styleCicle} name={item.name}  />}
            keyExtractor={(item) => item.toString()}
          />
         
        </View>

        <View className="flex justify-center items-start mt-10 gap-4">
          <Text className="text-2xl font-bold">15.11.24</Text>

          <FlatList
            contentContainerClassName="flex mt-2 gap-4"
            data={dietDatasecond}
            renderItem={({ item }) => <DietCard key={item.id} hour={item.hour} styleCicle={item.styleCicle} name={item.name} />}
            keyExtractor={(item) => item.toString()}
          />
          
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
