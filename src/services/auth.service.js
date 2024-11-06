import axios from 'axios'


class AuthService{

    constructor() {

        this.api = axios.create({
            // Create a new instance of axios with a custom configuration
            baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005'
            // We set our API's base URL so that all requests use the same base URL
        })

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use(config => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem('token')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`}
            }

            return config
        })

        this.api.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token')
                }
                return Promise.reject(error)
            }
        )

    }

    async signup(requestBody){
        try {
           const response = await this.api.post('/auth/signup', requestBody)
           return response.data  
        } catch (error) {
            console.error('Error during sign up', error)
        }
    }

    async login(requestBody) {
        try {
            const response = await this.api.post('/auth/login', requestBody)
            return response.data
        } catch (error) {
            console.error('Error during login: ', error)
            throw error
        }
    }

    async verify(token){
        try {
            const response = await this.api.get('/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('plain response: ', response)
            console.log('data response: ',response.data)
            return response.data
        } catch (error) {
            console.error('Error during verification ', error)
            throw error
        }
    }
}

const authService = new AuthService()

export default authService