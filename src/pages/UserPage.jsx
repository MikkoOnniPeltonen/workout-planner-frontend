import { useState, useEffect } from "react"
import Choose from "../components/Choose"
import Statistics from "../components/Statistics"
import { Card } from "../components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card"
import workoutService from '../services/workouts.service'
import userService from "../services/users.service"
import { toast } from 'react-hot-toast'
import LoadingSpinner from "../components/LoadingSpinner"

function UserPage() {

    const [allWorkouts, setAllWorkouts] = useState(new Map())
    const [currentUser, setCurrentUser] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [view, setView] = useState('create')

    const handleSelectView = (selectedView) => {
      setView(selectedView)
    }

    useEffect(() => {

      const fetchUser = async () => {
        try {
          const response = await userService.getUser()
          setCurrentUser(response)

        } catch (error) {
          console.error('Error fetching user name', error)
        }
      }
      fetchUser()
    }, [])


    useEffect(() => {

      const fetchWorkouts = async () => {
        
        try {
          setIsLoading(true)

          const response = await workoutService.getAllWorkouts()
          
          if (response.message) {
            console.log('Message Userpage: No workouts found.', response.message)
            setAllWorkouts(new Map())
          } else if (Array.isArray(response)) {
            const workoutsMap = new Map(
              response.map(oneWorkout => [oneWorkout._id, oneWorkout])
            )
            setAllWorkouts(workoutsMap)
            console.log(allWorkouts)
          }
        } catch (error) {
          console.error('Error fetching workouts', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      
      fetchWorkouts()
    }, [view])

    function handleDelete(oneWorkoutId) {

      if (!window.confirm('Are you sure you want to delete this workout?')) {
        return
      }

      workoutService.deleteWorkout(oneWorkoutId)
      .then(() => {
        
        if (!allWorkouts.has(oneWorkoutId)) {
          toast.error('Workout not found.')
          return
        }
        
        const updatedWorkouts = new Map(allWorkouts)
        updatedWorkouts.delete(oneWorkoutId)
        
        setAllWorkouts(updatedWorkouts)
        toast.success('Workout deleted succesfully!')
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.errorMessage || 'Error in deleting workout.'
        toast.error(errorMessage)
        console.error('Error in deleting workout.', error)
      })
    }

  return (
    <div className="app-container">
    <aside className="sidebar">
      <h6>{currentUser + "' " + "Page"}</h6>
      <button onClick={() => handleSelectView('allWorkouts')} className="sidebar-button">All Workouts</button>
      <button onClick={() => handleSelectView('create')} className="sidebar-button">Create Workout</button>
      <button onClick={() => handleSelectView('edit')} className="sidebar-button">Edit Workout</button>
      <button onClick={() => handleSelectView('statistics')} className="sidebar-button">Statistics</button>

    </aside>
    <main className="content">
      {isLoading ? (<LoadingSpinner />) : (view === 'allWorkouts' && allWorkouts.size > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Exercises</th>
              <th>Extras</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(allWorkouts.values()).map(oneWorkout => (
              <tr key={oneWorkout._id}>
                <td>{oneWorkout.name}</td>
                <td>
                  {oneWorkout.exercises && Array.isArray(oneWorkout.exercises) ? (
                    oneWorkout.exercises.map((oneExercise) => (
                    <div key={oneExercise._id}>{oneExercise.name}</div>
                    ))
                  ) : (
                    <div>No exercises</div>
                  )}
                </td>
                <td>
                  <HoverCard>
                    <HoverCardTrigger asChild><button>Info</button></HoverCardTrigger>
                    <HoverCardContent>
                      <p>Gets you there when applied with:</p>
                      <ul className="list-disc pl-4">
                        {oneWorkout.usedWith && Array.isArray(oneWorkout.usedWith) ? (
                          oneWorkout.usedWith.map((oneItem, index) => (
                            <li key={index} className="text-sm m-2">{oneItem + ' '}</li>
                          ))
                        ) : (
                          <li>No additional information</li>
                        )}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </td>
                <td><button onClick={() => handleDelete(oneWorkout._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Card>
          <p>No workouts available. Create one to get started!</p>
        </Card>
      ))}
    {view === 'create' && <Choose />}
    {view === 'edit' && (allWorkouts.size > 0 ? (
      <Choose userData={allWorkouts} />
      ) : (
        <LoadingSpinner />
      ))}
    {view === 'statistics' && <Statistics workouts={allWorkouts} />}
   </main>

    </div>
  )
}

export default UserPage
