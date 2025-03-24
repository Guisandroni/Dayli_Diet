import { useEffect, useState } from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDietStats, getDietSequences } from '../api/diet/getStats';

interface DietStats {
  inDiet: {
    percentage: number;
    count: number;
  };
  outDiet: {
    count: number;
    percentage: number;
  };
  total: number;
}

interface DietSequence {
  maxSequence: number;
  currentSequence: number;
  startDate?: string;
  endDate?: string;
}

export default function Sequence() {
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<DietStats | null>(null);
  const [sequences, setSequences] = useState<DietSequence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          router.replace('/pages/login');
        }
      } catch (error) {
        console.error('Erro ao buscar ID do usuário:', error);
        router.replace('/pages/login');
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const [statsData, sequencesData] = await Promise.all([
          getDietStats(userId),
          getDietSequences(userId)
        ]);
        console.log('Estatísticas carregadas:', statsData);
        console.log('Sequências carregadas:', sequencesData);
        setStats(statsData);
        setSequences(sequencesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-green-mid">
        <ActivityIndicator size="large" color="#00875F" />
      </View>
    );
  }

  const porcentagem = stats?.inDiet?.percentage?.toFixed(2) || '0';
  const isGoodDiet = Number(porcentagem) >= 50;

  return (
    <View className={`h-full ${isGoodDiet ? 'bg-green-mid' : 'bg-red-mid'}`}>
      <View className={`relative flex flex-col items-center justify-center mt-6 h-40 ${isGoodDiet ? 'bg-green-mid' : 'bg-red-mid'}`}>
        <Text className='text-4xl font-nunito-bold'>{porcentagem}%</Text>
        <Text className='text-xl font-nunito-regular'>das refeições dentro da dieta</Text>
        <AntDesign 
          onPress={() => router.back()} 
          name="arrowleft"
          size={24} 
          color="green" 
          className='absolute top-5 left-4'
        />
      </View>
      <StatusBar className={`${isGoodDiet ? 'bg-green-mid' : 'bg-red-mid'}`} />

      <View className='flex flex-col items-center h-full gap-10 px-4 bg-gray-100 rounded-t-3xl'>
        <Text className='mt-10 text-xl font-nunito-bold'>Estatísticas gerais</Text>
        
        <View className='flex flex-col items-center justify-center w-full px-4 py-6 bg-gray-5 rounded-xl'>
          <Text className='text-4xl font-nunito-bold'>{sequences?.maxSequence || 0}</Text>
          <Text className='font-nunito-regular'>Melhor sequência de pratos dentro da dieta</Text>
        </View>

        <View className='flex flex-col items-center justify-center w-full px-4 py-6 bg-gray-5 rounded-xl'>
          <Text className='text-4xl font-nunito-bold'>{stats?.total || 0}</Text>
          <Text className='font-nunito-regular'>Total de refeições registradas</Text>
        </View>

        <View className='flex flex-col items-center justify-center w-40 h-40 px-4 bg-green-mid rounded-xl'>
          <Text className='text-2xl font-nunito-bold'>{stats?.inDiet?.count || 0}</Text>
          <Text className='text-lg text-center font-nunito-regular'>refeições dentro da dieta</Text>
        </View>
        <View className='flex flex-col items-center justify-center w-40 h-40 px-4 bg-red-mid rounded-xl'>
          <Text className='text-2xl font-nunito-bold'>{stats?.outDiet?.count || 0}</Text>
          <Text className='text-lg text-center font-nunito-regular'>refeições fora da dieta</Text>
        </View>

        {sequences && sequences.currentSequence > 0 && sequences.startDate && sequences.endDate && (
          <View className='flex flex-col items-center justify-center w-full px-4 py-6 bg-green-mid rounded-xl'>
            <Text className='text-4xl font-nunito-bold'>{sequences.currentSequence}</Text>
            <Text className='font-nunito-regular'>Sequência atual de pratos dentro da dieta</Text>
            <Text className='mt-2 text-sm text-center text-gray-600 font-nunito-regular'>
              De {sequences.startDate} até {sequences.endDate}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}