import DietCard from "@/components/DietCard";
import { dietData, dietDatasecond } from "@/seed/constraints";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDiets } from "./hooks/useDiets";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getDietSequences, getDietStats } from "./api/getStats";

export default function Index() {
  const { diets, loading, fetchDiets } = useDiets()
  const isFocused = useIsFocused()
  const [stats, setStats] = useState<any>(null)
  const [sequences, setSequences] = useState<any>(null)
  const [inLoading, setLoading] = useState(true)
  const porcentagem = stats?.inDiet?.percentage?.toFixed(2)
  
  const loadData = async () => {
    try {
      setLoading(true)
      const [statsData, sequencesData] = await Promise.all([
        getDietStats(),
        getDietSequences()
      ])
      setStats(statsData)
      setSequences(sequencesData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    if (isFocused) {
      fetchDiets()
      getDietStats()
      loadData()
    }
  }, [isFocused])

  return (
    <SafeAreaView className="h-full px-6 py-8 bg-gray-100">
      <StatusBar className="bg-gray-100"/>
      <ScrollView
        contentContainerClassName="pb-40"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-col items-center gap-4">
            <Text className="text-3xl font-nunito-bold">Daily Diet</Text>
          </View>
          <TouchableOpacity  
            className="w-12 h-12 bg-black rounded-full"
            onPress={() => router.push('/testapi')}
          />
        </View>

        <View className="relative flex items-center justify-center py-6 mt-10 bg-green-mid rounded-xl">
          <Text className="text-4xl font-bold text-center">
           {porcentagem}% {'\n'}
            <Text className="text-xl font-light">das refeições dentro da dieta</Text>
          </Text>
          <MaterialCommunityIcons 
            onPress={() => router.push('/pages/sequence')} 
            name="arrow-top-right" 
            size={24} 
            color="green" 
            className="absolute right-6 top-2" 
          />
        </View>

        <View className="flex flex-col items-start gap-4 mt-10">
          <Text className="text-xl">Refeições</Text>
          <TouchableOpacity 
          onPress={()=>router.push('/pages/newdiet')}
          className="flex flex-row items-center justify-center w-full h-16 gap-6 bg-gray-1 rounded-xl">
            <AntDesign name="plus" size={22} color="white" className="font-bold" />
            <Text className="text-xl text-white">Nova refeição</Text>
          </TouchableOpacity>
        </View>

        <View className="flex items-start justify-center gap-4 mt-10">
          <Text className="text-2xl font-bold">02.03.25</Text>

          {loading ? (
            <View className="flex items-center justify-center mt-10">
              <Text>Carregando dietas...</Text>
            </View>
          ) : (
            <FlatList
              contentContainerClassName="flex mt-2 gap-4"
              data={diets}
              renderItem={({ item }) => <DietCard item={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>

        <View className="flex items-start justify-center gap-4 mt-10">
          <Text className="text-2xl font-bold">{}</Text>

          {/* <FlatList
            contentContainerClassName="flex mt-2 gap-4"
            data={diets}
            renderItem={({ item }) => <DietCard item={item}  />}
            keyExtractor={(item) => item.toString()}
          /> */}
          
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
