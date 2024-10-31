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

      getAllWorkouts(){
        return this.api.get('/workouts')
      }

      getWorkoutForInfo(workoutId){
        return this.api.get(`/workouts/${workoutId}`)
      }

      createWorkout(workoutToCreate){
        return this.api.post('/workouts',workoutToCreate)
      }

      updateWorkout(workoutId, workoutInfo ){
        return this.api.put(`/workouts/${workoutId}`,workoutInfo)
      }

      deleteWorkout(workoutId) {
        return this.api.delete(`/workouts/${workoutId}`)
      }



}


const workoutService = new WorkoutService()

export default workoutService