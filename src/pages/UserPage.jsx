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
import exerciseService from "../services/exercises.service"
import { toast } from 'react-hot-toast'

function UserPage() {

    const [allWorkouts, setAllWorkouts] = useState([])
    const [allExercises, setAllExercises] = useState([])

    const [view, setView] = useState('allWorkouts')

    const handleSelectView = (selectedView) => {
      setView(selectedView)
    }

    useEffect(() => {

        exerciseService.getAllExercises().then((foundExercises) => {
          setAllExercises(foundExercises.data)
        })
        .catch((err) => {
          console.error('Error fetching exercises', err)
        })
  


      console.log(allExercises)
    }, [])

    useEffect(() => {

      workoutService.getAllWorkouts()
      .then((foundWorkouts) => {
        setAllWorkouts(foundWorkouts.data)
      })
      .catch((error) => {
        console.error('Error fetching workouts', error)
      })

    }, [view])

    function handleDelete(oneWorkoutId) {
      workoutService.deleteWorkout(oneWorkoutId)
      .then(() => {

        const deletedWorkoutIndex = allWorkouts.findIndex(workout => workout._id === oneWorkoutId)
        allWorkouts.splice(deletedWorkoutIndex, 1)
        setAllWorkouts([...allWorkouts])

        toast.success('Workout deleted succesfully!')
      })
      .catch((error) => {
        toast.error('Error in deleting workout.')
        console.error('Error in deleting workout.', error)
      })
    }

  return (
    <div className="app-container">
    <aside className="sidebar">
      <button onClick={() => handleSelectView('allWorkouts')} className="sidebar-button">All Workouts</button>
      <button onClick={() => handleSelectView('create')} className="sidebar-button">Create Workout</button>
      <button onClick={() => handleSelectView('edit')} className="sidebar-button">Edit Workout</button>
      <button onClick={() => handleSelectView('statistics')} className="sidebar-button">Statistics</button>

    </aside>
    <main className="content">
      {view === 'allWorkouts' && allWorkouts.length > 0 ? (
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
            {allWorkouts.map((oneWorkout) => {
              <tr key={oneWorkout._id}>
                <td>{oneWorkout.name}</td>
                <td>
                  {oneWorkout.exercises && oneWorkout.exercises.map((oneExercise) => {
                    <div key={oneExercise._id}>{oneExercise.name}</div>
                  })}
                </td>
                <td>
                  <HoverCard>
                    <HoverCardTrigger asChild><button>Info</button></HoverCardTrigger>
                    <HoverCardContent>
                      <p>Gets you there when applied with:</p>
                      <ul>
                        {oneWorkout.usedWith && oneWorkout.usedWith.map((oneItem, index) => (
                          <li key={index}>{oneItem}</li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </td>
                <td><button onClick={() => handleDelete(oneWorkout._id)}>delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
      ) : (
      <Card>
        <p>No workouts available. Create one to get started!</p>
      </Card>
    )}
    {view === 'create' && <Choose />}
    {view === 'edit' && <Choose userData={allWorkouts} isEditMode = {true} />}
    {view === 'statistics' && <Statistics creatorId={creatorId} />}
   </main>

    </div>
  )
}

export default UserPage
