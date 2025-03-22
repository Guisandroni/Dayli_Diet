import { useState } from 'react'
import { login, registerUser } from "../api/user/user"

interface UserResponse {
    id: string;
    name: string;
    email: string;
    token?: string;
}

interface ErrorResponse {
    message: string;
}

export function useUser() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<UserResponse | null>(null)

    const createUser = async (name: string, email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await registerUser({ name, email, password })
            setUser(response)
            return response
        } catch (err) {
            const error = err as ErrorResponse
            setError(error.message || 'Erro ao criar usuário')
            return null
        } finally {
            setLoading(false)
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await login({ email, password })
            setUser(response)
            return response
        } catch (err) {
            const error = err as ErrorResponse
            setError(error.message || 'Erro ao fazer login')
            return null
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        // Aqui você pode adicionar lógica adicional como limpar o token do storage
    }

    return { 
        user,
        loading,
        error,
        createUser,
        loginUser,
        logout
    }
}
             

