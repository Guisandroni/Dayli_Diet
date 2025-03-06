import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar } from "react-native";

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteDiet: React.FC<ModalProps> = ({ modal, setModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(false)}

    >
      <View className="flex-1 justify-center items-center px-6   bg-zinc-900/40">
      <StatusBar className='bg-zinc-900/40'/>
        <View className="bg-white w-full h-60 rounded-xl flex flex-col justify-center items-center" >
          <Text className="text-2xl font-nunito-bold text-center px-4">Deseja realmente excluir o registro da refeição?</Text>
        
         <View className="flex flex-row justify-center items-center gap-4 mt-10">
         <TouchableOpacity
         className="bg-white border-2 border-gray-1 py-4 px-8 rounded-xl"
            onPress={() => setModal(false)} 
          >
            <Text className="text-xl font-nunito-bold">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-1 border-2 border-white py-4 px-8 rounded-xl"
          >
            <Text className="text-xl font-nunito-bold text-white">Sim, excluir</Text>
          </TouchableOpacity>
         </View>
        </View>
      </View>
    </Modal>
  );
};