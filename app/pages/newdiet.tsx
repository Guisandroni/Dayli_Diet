import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useDietbyuser } from '../hooks/useDietbyuser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Yorn from '@/components/yorn';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
interface DietForm {
  name: string;
  description: string;
  dateCreated: string;
  hourCreated: string;
  inDiet: 'SIM' | 'NAO';
}

export default function NewDiet() {
  const [userId, setUserId] = useState<string | null>(null);
  const { registerDiet, loading, error } = useDietbyuser(userId || '');
  const [form, setForm] = useState<DietForm>({
    name: '',
    description: '',
    dateCreated: new Date().toISOString().split('T')[0],
    hourCreated: new Date().toLocaleTimeString().slice(0, 5),
    inDiet: 'SIM'
  });

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          console.log('UserId encontrado:', storedUserId);
          setUserId(storedUserId);
        } else {
          console.log('UserId não encontrado, redirecionando para login');
          router.replace('/pages/login');
        }
      } catch (error) {
        console.error('Erro ao buscar ID do usuário:', error);
        router.replace('/pages/login');
      }
    };

    getUserId();
  }, []);

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert('Erro', 'O nome da refeição é obrigatório');
      return false;
    }
    if (!form.dateCreated.trim()) {
      Alert.alert('Erro', 'A data é obrigatória');
      return false;
    }
    if (!form.hourCreated.trim()) {
      Alert.alert('Erro', 'A hora é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.log('UserId não encontrado, redirecionando para login');
      router.replace('/pages/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const dietData = {
        ...form,
        userId: userId
      };
      
      console.log('Enviando dados:', dietData);
      await registerDiet(dietData);
      if (form.inDiet === 'NAO') {
        router.push('/pages/notDietSequence');
      } else {  
        router.push('/pages/yesDietSequence');
      }
    } catch (error) {
      console.error('Erro ao registrar dieta:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a refeição. Tente novamente.');
    }
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && event.type === 'set') {
      const formattedDate = selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setForm(prev => ({ ...prev, dateCreated: formattedDate }));
    }
  };
  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime && event.type === 'set') {
      const hours = String(selectedTime.getHours()).padStart(2, '0');
      const minutes = String(selectedTime.getMinutes()).padStart(2, '0')
      const formattedTime = `${hours}:${minutes}`
      setForm(prev => ({ ...prev, hourCreated: formattedTime }));
    }
  };
  return (
    <View className='h-full mt-6 bg-gray-4'>
      <View className='flex items-center justify-center h-10 mt-6 bg-gray-4'>
        <Text className='text-2xl font-nunito-bold'>Nova Refeição</Text>
        <AntDesign
          onPress={() => router.back()}
          name="arrowleft"
          size={24}
          color="black"
          className='absolute top-2 left-4'
        />
      </View>
      <StatusBar className='bg-gray-4' />

      <View className='flex items-center w-full h-full px-2 mt-10 bg-white flex--col'>
        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Nome</Text>
          <TextInput
            className='px-4 py-3 text-xl border rounded-lg border-gray-4 font-nunito-regular'
            value={form.name}
            onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
            placeholder="Digite o nome da refeição"
          />
        </View>

        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Descrição</Text>
          <TextInput
            multiline={true}
            textAlignVertical='top'
            className='h-40 px-4 text-xl border rounded-lg border-gray-4 font-nunito-regular'
            value={form.description}
            onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
            placeholder="Descreva a refeição"
          />
        </View>

        <View className='flex flex-row justify-between w-full gap-4 px-10 mt-10'>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex justify-center flex-1 gap-2 px-4 py-3 bg-white border rounded-lg border-gray-4"
          >
            <Text className="text-xl text-gray-600">Data</Text>
            <Text className="text-xl font-nunito-bold">{form.dateCreated}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="flex justify-center flex-1 gap-2 px-4 py-3 bg-white border rounded-lg border-gray-4"
          >
            <Text className="text-xl text-gray-600">Hora</Text>
            <Text className="text-xl font-nunito-bold">{form.hourCreated}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(form.dateCreated)}
              mode="date"
              onChange={handleDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date(form.hourCreated)}
              mode="time"
              is24Hour={true}
              onChange={handleTimeChange}
            />
          )}
        </View>

        <View className='flex flex-col items-center justify-center w-full gap-6 mt-10'>
          <Text className='text-xl font-nunito-bold text-start'>Está dentro da dieta?</Text>

          <View className='flex flex-row gap-4'>
            <Yorn
              title='Sim'
              circle={`bg-green-dark`}
              bgBorder={`border border-green-dark ${form.inDiet === 'SIM' ? 'bg-green-mid' : 'bg-white'}`}
              onPress={() => setForm(prev => ({ ...prev, inDiet: 'SIM' }))}
            />
            <Yorn
              title='Não'
              circle={`bg-red-dark`}
              bgBorder={`border border-red-dark ${form.inDiet === 'NAO' ? 'bg-red-mid' : 'bg-white'}`}
              onPress={() => setForm(prev => ({ ...prev, inDiet: 'NAO' }))}
            />
          </View>
        </View>

        {error && (
          <Text className='mt-4 text-red-500'>{error}</Text>
        )}

        <TouchableOpacity
          className='flex items-center justify-center px-24 mt-20 bg-gray-1 h-14 rounded-xl'
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className='text-xl text-white font-nunito-bold'>
            {loading ? 'Cadastrando...' : 'Cadastrar Refeição'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}