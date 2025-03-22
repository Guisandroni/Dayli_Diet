import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useUser } from '../hooks/useUser'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {
    const router = useRouter()
    const { loginUser, loading, error } = useUser()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password)
            
            if (response?.id) {
                await AsyncStorage.setItem('userId', response.id)
                router.replace('/pages/home')
            } else {
                console.error('ID do usuário não encontrado na resposta:', response)
            }
        } catch (error) {
            console.error('Erro no login:', error)
        }
    }

    return (
        <View className="justify-center flex-1 px-8 bg-white">
            <Text className="mb-8 text-3xl font-bold text-center">Login</Text>

            {error && (
                <Text className="mb-4 text-center text-red-500">{error}</Text>
            )}

            <TextInput
                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg"
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                
            />

            <TouchableOpacity
                className="items-center justify-center w-full h-12 bg-green-500 rounded-lg"
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text className="text-lg font-bold text-white">Entrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                className="mt-4" 
                onPress={() => router.push('/pages/register')}
            >
                <Text className="text-center text-gray-600">
                    Não tem uma conta? Cadastre-se
                </Text>
            </TouchableOpacity>
        </View>
    )
} 