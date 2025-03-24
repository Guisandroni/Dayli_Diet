import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useUser } from '../hooks/useUser'
import { useRouter } from 'expo-router'

export default function Register() {
    const router = useRouter()
    const { createUser, loading, error } = useUser()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        const response = await createUser(name, email, password)
        if (response) {
            router.replace('/pages/home')
        }
    }

    return (
        <View className="justify-center flex-1 px-8 bg-white">
            <Text className="mb-8 text-3xl font-bold text-center">Cadastro</Text>

            {error && (
                <Text className="mb-4 text-center text-red-500">{error}</Text>
            )}

            <TextInput
                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />

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
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text className="text-lg font-bold text-white">Cadastrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                className="mt-4" 
                onPress={() => router.push('/pages/login')}
            >
                <Text className="text-center text-gray-600">
                    Já tem uma conta? Faça login
                </Text>
            </TouchableOpacity>
        </View>
    )
} 