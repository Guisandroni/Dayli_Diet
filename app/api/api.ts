import axios from 'axios'
import { Alert } from 'react-native'


export const api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000
})

export const HandleError  = (error: any) =>{
    if(error.response?.data.error){
        Alert.alert(error.response?.data.error)
    } else Alert.alert('Erro ao carregar os dados')
}

