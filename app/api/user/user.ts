import axios from 'axios'
import api from '../axios';



interface UserData {
    name?: string;
    email: string;
    password: string;
}

interface UserResponse {
    id: string;
    name: string;
    email: string;
    password: string;
 
}

export async function registerUser(data: UserData): Promise<UserResponse> {
    const response = await api.post('/users', data)
    return response.data
}

export async function login(data: UserData): Promise<UserResponse> {
    const response = await api.post('/users/login', data)
    return response.data
}

export default login


