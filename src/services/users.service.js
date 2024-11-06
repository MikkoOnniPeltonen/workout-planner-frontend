

import axios from 'axios';

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005'
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    async getUser() {
        try {
            const response = await this.api.get('/users')
            console.log(response.data)
            return response.data 
        } catch (error) {
            console.error('Error in getting user information', error)
            throw error
        }
    }

}

const userService = new UserService();

export default userService;
