import { useState, useEffect } from "react"
import axios from 'axios'
import Choose from "@/components/Choose"
import Statistics from "@/components/Statistics"
import { Card } from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

function UserPage() {

    const [allWorkouts, setAllWorkouts] = useState([])
    const [allExercises, setAllExercises] = useState([])

    const [view, setView] = useState('allWorkouts')

    const handleSelectView = (selectedView) => {
      setView(selectedView)
    }

    useEffect(() => {


      axios.get(`${import.meta.env.VITE_BACKEND_URL}/exercises`)
      .then((foundExercises) => {
          setAllExercises(foundExercises.data)
      })
      .catch((err) => {
          console.error('Error fetching exercises', err)
      })

      console.log(allExercises)
    }, [])

    useEffect(() => {

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/workouts`)
      .then((foundWorkouts) => {
        setAllWorkouts(foundWorkouts.data)
      })
      .catch((error) => {
        console.error('Error fetching workouts', error)
      })

    }, [view])

  return (
    <div className="app-container">
    <aside className="sidebar">
      <button onClick={() => handleSelectView('allWorkouts')} className="sidebar-button">All Workouts</button>
      <button onClick={() => handleSelectView('create')} className="sidebar-button">Create Workout</button>
      <button onClick={() => handleSelectView('edit')} className="sidebar-button">Edit Workout</button>
      <button onClick={() => handleSelectView('statistics')} className="sidebar-button">Statistics</button>

    </aside>
    <main className="content">
      {view === 'allWorkouts' && allWorkouts ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Exercises</th>
              <th>Extras</th>
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
                      {oneWorkout.usedWith && oneWorkout.usedWith.map((oneItem) => {
                        <div key={oneItem}>
                          <p>If you like use with:</p>
                          <p>{oneItem}</p>
                        </div>
                      })}
                    </HoverCardContent>
                  </HoverCard>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      ) : (
      <Card>
        <p>No workouts available. Create one to get started!</p>
      </Card>
    )}
    {view === 'create' && <Choose exercises={allExercises} />}
    {view === 'edit' && <Choose exercises = {allExercises} userData = {allWorkouts} isEditMode = {true} />}
    {view === 'statistics' && <Statistics workouts={allWorkouts} />}
   </main>

    </div>
  )
}

export default UserPage
