import { useDiet } from "@/app/hooks/useDiet";
import { useDiets } from "@/app/hooks/useDiets";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar, Alert } from "react-native";

interface ModalProps {
  item: any;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteDiet: React.FC<ModalProps> = ({ item, modal, setModal }) => {
  const { id } = useLocalSearchParams()
    const { diet } = useDiet(id as string)
    console.log(diet)
    const { removeDiet } = useDiets()

    const handleDelete = async () => {
      await removeDiet(item.id)
      setModal(false)
      router.back()
    }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(false)}

    >
      <View className="items-center justify-center flex-1 px-6 bg-zinc-900/40">
      <StatusBar className='bg-zinc-900/40'/>
        <View className="flex flex-col items-center justify-center w-full bg-white h-60 rounded-xl" >
          <Text className="px-4 text-2xl text-center font-nunito-bold">Deseja realmente excluir o registro da refeição?</Text>
        
         <View className="flex flex-row items-center justify-center gap-4 mt-10">
         <TouchableOpacity
         className="px-8 py-4 bg-white border-2 border-gray-1 rounded-xl"
            onPress={() => setModal(false)} 
          >
            <Text className="text-xl font-nunito-bold">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="px-8 py-4 border-2 border-white bg-gray-1 rounded-xl"
          >
            <Text className="text-xl text-white font-nunito-bold">Sim, excluir</Text>
          </TouchableOpacity>
         </View>
        </View>
      </View>
    </Modal>
  );
};