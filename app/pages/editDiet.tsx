import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import Yorn from '@/components/yorn'
import { useIsFocused } from '@react-navigation/native'
import { useDiet } from '../hooks/useDiet'
import { useDietbyuser } from '../hooks/useDietbyuser'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const EditDiet = () => {
  const { id, userId } = useLocalSearchParams()
  const { diet, loading, error, updateDiet } = useDiet(id as string, userId as string)
  const { fetchDiets } = useDietbyuser(userId as string)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateCreated: new Date().toLocaleDateString('pt-BR'),
    hourCreated: new Date().toLocaleTimeString().slice(0, 5),
    inDiet: 'SIM' as 'SIM' | 'NAO'
  })

  useEffect(() => {
    if (diet) {
      setFormData({
        name: diet.name,
        description: diet.description,
        dateCreated: diet.dateCreated,
        hourCreated: diet.hourCreated,
        inDiet: diet.inDiet
      })
    }
  }, [diet])

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && event.type === 'set') {
      const formattedDate = selectedDate.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
      setFormData(prev => ({ ...prev, dateCreated: formattedDate }));
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime && event.type === 'set') {
      const hours = String(selectedTime.getHours()).padStart(2, '0');
      const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setFormData(prev => ({ ...prev, hourCreated: formattedTime }));
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        alert('O nome da refeição é obrigatório');
        return;
      }

      await updateDiet({
        name: formData.name,
        description: formData.description,
        hourCreated: formData.hourCreated,
        dateCreated: formData.dateCreated,
        inDiet: formData.inDiet
      })
      
      await fetchDiets()
      router.back()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar as alterações. Tente novamente.')
    }
  }

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Carregando...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Erro ao carregar dados: {error}</Text>
      </View>
    )
  }

  return (
    <View className='h-full mt-6 bg-gray-4'>
      <View className='flex items-center justify-center h-10 mt-4 bg-gray-4'>
        <Text className='text-2xl font-nunito-bold '>Editar Refeição</Text>
        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" className='absolute top-2 left-4' />
      </View>
      <StatusBar className='bg-gray-4 ' />

      <View className='flex items-center w-full h-full px-2 mt-10 bg-white flex--col '>
        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Nome</Text>
          <TextInput 
            className='px-4 py-3 text-2xl border rounded-lg border-gray-4 font-nunito-regular'
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
          />
        </View>

        <View className='w-full px-8 mt-10'>
          <Text className='text-xl font-nunito-regular'>Descrição</Text>
          <TextInput
            multiline={true}
            textAlignVertical='top'
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({...prev, description: text}))}
            className='h-40 px-4 text-2xl border rounded-lg border-gray-4 font-nunito-regular' 
          />
        </View>

        <View className='flex flex-row justify-between w-full gap-4 px-10 mt-10'>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex justify-center flex-1 gap-2 px-4 py-3 bg-white border rounded-lg border-gray-4"
          >
            <Text className="text-xl text-gray-600">Data</Text>
            <Text className="text-xl font-nunito-bold">{formData.dateCreated}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="flex justify-center flex-1 gap-2 px-4 py-3 bg-white border rounded-lg border-gray-4"
          >
            <Text className="text-xl text-gray-600">Hora</Text>
            <Text className="text-xl font-nunito-bold">{formData.hourCreated}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            onChange={handleTimeChange}
          />
        )}

        <View className='flex flex-col items-center justify-center w-full gap-6 mt-10'>
          <Text className='text-xl font-nunito-regular text-start'>Está dentro da dieta?</Text>

          <View className='flex flex-row gap-4'>
            <Yorn 
              title='Sim' 
              circle={`bg-green-dark`} 
              bgBorder={`border border-green-dark ${formData.inDiet === 'SIM' ? 'bg-green-mid' : 'bg-white'}`}
              onPress={() => setFormData(prev => ({...prev, inDiet: 'SIM'}))}
            />
            <Yorn 
              title='Não'
              circle={`bg-red-dark`}
              bgBorder={`border border-red-dark ${formData.inDiet === 'NAO' ? 'bg-red-mid' : 'bg-white'}`}
              onPress={() => setFormData(prev => ({...prev, inDiet: 'NAO'}))}
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleSave}
          className='flex items-center justify-center px-24 mt-20 bg-gray-1 h-14 rounded-xl'
        >
          <Text className='text-xl text-white font-nunito-bold'>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditDiet