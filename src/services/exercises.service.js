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

    getExercisesByMuscleGroups(muscleGroups) {
        return this.api.post('/exercises/by-muscle-groups', muscleGroups);
    }

}

const exerciseService = new ExerciseService();

export default exerciseService;
