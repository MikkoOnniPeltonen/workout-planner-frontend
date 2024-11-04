
import axios from 'axios';

class MuscleGroupService {
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

    async getAllmusclegroups() {
        try {
            const response = await this.api.get('/musclegroups')
            return response.data
        } catch (error) {
            console.error('Error fetching musclegroups', error)
            throw error
        }
    }

}

const musclegroupService = new MuscleGroupService();

export default musclegroupService;
