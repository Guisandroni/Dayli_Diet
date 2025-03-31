import axios from 'axios'



const api = axios.create({
   
    baseURL: "https://apidailydiet.onrender.com/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 500; 
    }
})

api.interceptors.request.use(
    config => {
        console.log('Enviando requisição para:', config.url)
        console.log('Headers:', config.headers)
        return config
    },
    error => {
        console.error('Erro na configuração da requisição:', error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        console.log('Resposta recebida:', response.status)
        return response
    },
    error => {
        console.error('Erro na requisição:', error.message)
        if (error.response) {
            console.error('Dados do erro:', error.response.data)
            console.error('Status do erro:', error.response.status)
            console.error('Headers da resposta:', error.response.headers)
        } else if (error.request) {
            console.error('Erro de rede - Verifique se:')
            console.error('1. O servidor está rodando')
            console.error('2. O IP está correto')
            console.error('3. O dispositivo está na mesma rede')
            console.error('4. A porta está correta')
            console.error('5. O servidor está escutando em 0.0.0.0')
            console.error('6. Não há firewall bloqueando')
        }
        return Promise.reject(error)
    }
)

export default api