import axios from 'axios'

class WorkoutService{

    constructor() {
        // Create a new instance of axios with a custom configuration
        this.api = axios.create({
          baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005'
          // We set our API's base URL so that all requests use the same base URL
        });

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use(config => {
        // Retrieve the JWT token from the local storage
        const storedToken = localStorage.getItem('token');
   
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
   
        return config;
      });
     
    }

      async getAllWorkouts(){
        try {
          const response = await this.api.get('/workouts')
          return response.data
        } catch (error) {
          console.error('Error fetching workouts', error)
          throw error
        }
      }

      async createWorkout(createdWorkout) {
        try {
          const response = await this.api.post('/workouts', createdWorkout)
          return response.data
        } catch (error) {
          console.error('Error creating a workout', error)
          throw error
        }
      }

      async updateWorkout(workoutId, workoutInfo ){
        try {
          const response = await this.api.put(`/workouts/${workoutId}`, workoutInfo)
          return response.data
        } catch (error) {
          console.error('Error updating workout', error)
          throw error
        }
      }

      async deleteWorkout(workoutId) {
        try {
          const response = await this.api.delete(`/workouts/${workoutId}`)
          return response.data
        } catch (error) {
          console.error('Error deleting workout', error)
          throw error
        }
      }
}


const workoutService = new WorkoutService()

export default workoutService