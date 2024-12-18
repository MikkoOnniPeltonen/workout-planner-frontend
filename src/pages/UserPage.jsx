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
import musclegroupService from "../services/musclegroups.service"
import exerciseService from "../services/exercises.service"
import { toast } from 'react-hot-toast'
import LoadingSpinner from "../components/LoadingSpinner"
import Modal from "../components/Modal"

function UserPage() {

    const [allWorkouts, setAllWorkouts] = useState([])
    const [muscleGroups, setMuscleGroups] = useState([])
    const [allExercises, setAllExercises] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [view, setView] = useState('create')

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState(null)

    const handleSelectView = (selectedView) => {
      setView(selectedView)
    }
    
    const togglePin = (id) => {
      const updatedData = allWorkouts.map((workout) => workout._id === id ? { ...workout, isPinned: !workout.isPinned } : workout )
      
      setAllWorkouts(updatedData)
    }

    const sortedData = [...allWorkouts].sort((a, b) => {
      return b.isPinned - a.isPinned || a.name.localeCompare(b.name)
    })

    useEffect(() => {

      const fetchInitialData = async () => {
        try {
          setIsLoading(true)
          const [workoutsData, muscleGroupsData, exerciseData, userData] = await Promise.all([
            workoutService.getAllWorkouts(),
            musclegroupService.getAllmusclegroups(),
            exerciseService.getAllExercises(),
            userService.getUser()
          ])
          setAllWorkouts(workoutsData)
          setMuscleGroups(muscleGroupsData)
          setAllExercises(exerciseData)
          setCurrentUser(userData.name)

          console.log('workouts data: ', allWorkouts)
          console.log('musclegroup data: ', muscleGroups)
          console.log('current user data: ', currentUser)
        } catch (error) {
          toast.error('Error loading data')
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchInitialData()
    }, [])


    useEffect(() => {

      const fetchWorkouts = async () => {
        
        try {
          setIsLoading(true)

          const response = await workoutService.getAllWorkouts()
          setAllWorkouts(response)
        } catch (error) {
          console.error('Error fetching workouts', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchWorkouts()
    }, [view])

    const handleDelete = async (oneWorkoutId) => {

      if (!window.confirm('Are you sure you want to delete this workout?')) {
        return
      }

      try {
        await workoutService.deleteWorkout(oneWorkoutId)
        const updatedWorkouts = allWorkouts.filter(workout => workout._id !== oneWorkoutId)
        setAllWorkouts(updatedWorkouts)
        toast.success('Workout deleted succesfully!')
      } catch (error) {
        const errorMessage = error.response?.data?.errorMessage || 'Error in deleting workout.'
        toast.error(errorMessage)
        console.error('Error in deleting workout.', error)
      }
    }

    const openModal = (exercise) => {
      setSelectedExercise(exercise)
      setModalOpen(true)
    }

    const closeModal = () => {
      setModalOpen(false)
      setSelectedExercise(null)
    }

  return (
    <div className="app-container">
    <aside className="sidebar">
      <h6>{currentUser + "'s " + "Page"}</h6>
      <button onClick={() => handleSelectView('allWorkouts')} className="sidebar-button">All Workouts</button>
      <button onClick={() => handleSelectView('create')} className="sidebar-button">Create Workout</button>
      <button onClick={() => handleSelectView('edit')} className="sidebar-button">Edit Workout</button>
      <button onClick={() => handleSelectView('statistics')} className="sidebar-button">Statistics</button>

    </aside>
    <main className="content">
      {isLoading ? (<LoadingSpinner />) : (view === 'allWorkouts' && allWorkouts ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Exercises</th>
              <th>Extras</th>
              <th>Actions</th>
              <th>Pin</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(oneWorkout => (
              <tr key={oneWorkout._id} style={{ backgroundColor: oneWorkout.isPinned ? '#f0f8ff' : 'white'}}>
                <td>{oneWorkout.name}</td>
                <td>
                  {oneWorkout.exercises && Array.isArray(oneWorkout.exercises) ? (
                    oneWorkout.exercises.slice(0,3).map((oneExercise) => (
                    <div key={oneExercise._id}><button onClick={() => openModal(oneExercise)}>Show</button></div>
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
                      <ul className="flex flex-col gap-4 pl-4">
                        {oneWorkout.exercises.usedWith && Array.isArray(oneWorkout.exercises.usedWith) ? (
                          oneWorkout.exercises.usedWith.map((oneItem, index) => (
                            <li key={index} className="text-sm">{`${oneItem}`}</li>
                          ))
                        ) : (
                          <li>No additional information</li>
                        )}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </td>
                <td><button onClick={() => handleDelete(oneWorkout._id)}>delete</button></td>
                <td><button onClick={() => togglePin(oneWorkout._id)}>{oneWorkout.isPinned ? 'Unpin' : 'Pin'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Card>
          <p>No workouts available. Create one to get started!</p>
        </Card>
      ))}
    {view === 'create' && <Choose muscleGroups={muscleGroups} allExercises={allExercises} />}
    {view === 'edit' && (allWorkouts.length > 0 ? (
      <Choose workouts={allWorkouts} muscleGroups={muscleGroups} allExercises={allExercises} isEditMode={true} />
      ) : (
        <LoadingSpinner />
      ))}
    {view === 'statistics' && <Statistics workouts={allWorkouts} muscleGroups={muscleGroups} />}
   </main>
      <Modal isOpen={modalOpen} closeModal={closeModal} videoUrl={selectedExercise ? `https://www.youtube.com/embed/${selectedExercise.youtubeId}` : ''} exerciseName={selectedExercise ? selectedExercise.name : ''} />
    </div>
  )
}

export default UserPage
