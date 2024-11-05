import axios from 'axios';

class ExerciseService {
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

    async getAllExercises() {
        try {
            const response = await this.api.get('/exercises')
            console.log(response.data)
            return response.data 
        } catch (error) {
            console.error('Error in getting exercises', error)
            throw error
        }
    }

}

const exerciseService = new ExerciseService();

export default exerciseService;
