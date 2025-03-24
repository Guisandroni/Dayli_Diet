import DietCard from "@/components/DietCard";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getDietSequences, getDietStats } from "../api/diet/getStats";
import { useDietbyuser } from "../hooks/useDietbyuser";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GroupedDiets {
  date: string;
  diets: any[];
}

interface DietStats {
  inDiet: {
    percentage: number;
    count: number;
  };
  outDiet: {
    count: number;
  };
  total: number;
}

interface DietSequence {
  maxSequence: number;
  currentSequence: number;
  startDate?: string;
  endDate?: string;
}

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const { diets, loading: dietsLoading, error: dietsError, fetchDiets } = useDietbyuser(userId || '');
  const isFocused = useIsFocused();
  const [stats, setStats] = useState<DietStats | null>(null);
  const [sequences, setSequences] = useState<DietSequence | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupedDiets, setGroupedDiets] = useState<GroupedDiets[]>([]);
  const porcentagem = stats?.inDiet?.percentage?.toFixed(2) || '0';
  const isGoodDiet = Number(porcentagem) >= 50;

  const handleNewdiet = () => {
    if (!userId) {
      console.error('Usuário não autenticado');
      router.replace('/pages/login');
      return;
    }
    router.push('/pages/newdiet');
  }

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          console.log('ID do usuário recuperado:', storedUserId);
          setUserId(storedUserId);
        } else {
          console.log('ID do usuário não encontrado');
          router.replace('/pages/login');
        }
      } catch (error) {
        console.error('Erro ao buscar ID do usuário:', error);
        router.replace('/pages/login');
      }
    };

    getUserId();
  }, []);
  
  const loadData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const [statsData, sequencesData] = await Promise.all([
        getDietStats(userId),
        getDietSequences(userId)
      ]);
      setStats(statsData);
      setSequences(sequencesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && userId) {
      fetchDiets();
      loadData();
    }
  }, [isFocused, userId]);

  useEffect(() => {
    if (diets && Array.isArray(diets)) {
      console.log('Dietas recebidas:', diets);
      // Agrupa as dietas por data
      const grouped = diets.reduce((acc: { [key: string]: any[] }, diet: any) => {
        const date = diet.dateCreated || 'Sem data';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(diet);
        return acc;
      }, {});

      const groupedArray = Object.entries(grouped).map(([date, diets]) => ({
        date,
        diets
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setGroupedDiets(groupedArray);
    } else {
      console.log('Dietas inválidas ou vazias:', diets);
      setGroupedDiets([]);
    }
  }, [diets]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      router.replace('/pages/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const renderDietGroup = ({ item }: { item: GroupedDiets }) => (
    <View className="gap-4 mt-10">
      <Text className="text-2xl font-bold">{item.date}</Text>
      <View className="flex flex-col gap-4 mt-2">
        {item.diets.map((diet) => (
          <DietCard key={diet.id} item={diet} />
        ))}
      </View>
    </View>
  );

  if (dietsError) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-100">
        <Text className="text-xl text-red-500">Erro ao carregar dietas</Text>
        <TouchableOpacity 
          onPress={fetchDiets}
          className="px-6 py-3 mt-4 bg-gray-1 rounded-xl"
        >
          <Text className="text-white">Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

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
            onPress={handleLogout}
            className="items-center justify-center w-12 h-12 bg-black rounded-full"
          >
            <MaterialCommunityIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      
        <View className={`relative flex items-center justify-center py-6 mt-10 ${isGoodDiet ? 'bg-green-mid' : 'bg-red-mid'} rounded-xl`}>
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
            onPress={handleNewdiet}
            className="flex flex-row items-center justify-center w-full h-16 gap-6 bg-gray-1 rounded-xl"
          >
            <AntDesign name="plus" size={22} color="white" className="font-bold" />
            <Text className="text-xl text-white">Nova refeição</Text>
          </TouchableOpacity>
        </View>

        {(dietsLoading || loading) ? (
          <View className="flex items-center justify-center mt-10">
            <Text>Carregando dietas...</Text>
          </View>
        ) : (
          <FlatList
            data={groupedDiets}
            renderItem={renderDietGroup}
            keyExtractor={(item) => item.date}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
