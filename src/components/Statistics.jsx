
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect } from 'react'
import workoutService from '../services/workouts.service'

ChartJS.register(ArcElement, Tooltip, Legend)

function Statistics({ workouts }) {

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredWorkouts, setFilteredWorkouts] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: "Muscle Group Distribution",
            data: [],
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56',
                '#4BC0C0', '#9966FF', '#FF9F40', '#8DD1E1'
            ],
        }]
    })

    useEffect(() => {

        if (!(Array.isArray(workouts))) {
            console.error('Invalid data format: "workouts" should be an array')
            return
        }

        const filtered = workouts.filter(workout => 
            workout?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setFilteredWorkouts(filtered)
    }, [workouts, searchTerm])

    useEffect(() => {
        if (!selectedWorkout) return

        const fetchWorkoutDetails = async () => {
            try {
                const response = await workoutService.getOneWorkout(selectedWorkout._id)
                if (!response.ok) {
                    console.error('Failed to fetch workout details. Front end')
                    return
                }

                const workoutData = response
                updateMuscleGroups(workoutData)
            } catch (error) {
                console.error('Error fetching workout details', error)
            }
        }

        fetchWorkoutDetails()
    }, [selectedWorkout])


    const updateMuscleGroups = (workout) => {
        
        if (!workout || !Array.isArray(workout.exercises)) {
            console.error('Invalid workout data or exercises are missing.')
            return
        }

        const muscleGroups = {}

        workout.exercises.forEach((exercise) => {
            if (!exercise.belongsTo) return

            const seenMuscleGroups = new Set()

            exercise.belongsTo.forEach((muscleGroup) => {
                const muscleGroupName = muscleGroup?.name
                if (muscleGroupName && !seenMuscleGroups.has(muscleGroupName)) {
                    muscleGroups[muscleGroupName] = (muscleGroups[muscleGroupName] || 0) + 1
                    seenMuscleGroups.add(muscleGroupName)
                }
            })
        })

        if (Object.keys(muscleGroups).length > 0) {

            setData({
                labels: Object.keys(muscleGroups),
                datasets: [{
                    label: 'Muscle Group Distribution',
                    data: Object.values(muscleGroups),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56',
                        '#4BC0C0', '#9966FF', '#FF9F40', '#8DD1E1'
                    ],
                }]
            })
        } else {
            console.warn('No valid muscle group ata to update chart.')
        }

    }
    
  return (
    <div>
      <h2>Workout Muscle Group Statistics</h2>
      <input type="text" placeholder='Search workout' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {filteredWorkouts.legnth > 0 ? (
            <ul>
                {filteredWorkouts.map((workout) => (
                    <li key={_id} onClick={() => setSelectedWorkout(workout)}>
                        {workout.names}
                    </li>
                ))}
            </ul>
      ) : (
        <p>No workouts found.</p>
      )}
      {selectedWorkout ? (
        <div>
            <h3>{selectedWorkout.name}</h3>
            {selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
                <Pie data={data} />
            ) : (
                <p>No exercises found for this workout.</p>
            )}
        </div>
      ) : (
        <p>
            Select a workout to view muscle group distribution.
        </p>
      )}
    </div>
  )
}

export default Statistics
