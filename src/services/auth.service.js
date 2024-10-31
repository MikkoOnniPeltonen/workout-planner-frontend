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

    }

    signup(requestBody){
        return this.api.post('/auth/signup', requestBody)
    }

    login(requestBody) {
        return this.api.post('/auth/login', requestBody)
    }

    verify(){
        return this.api.get('/auth/verify')
    }
}

const authService = new AuthService()

export default authService