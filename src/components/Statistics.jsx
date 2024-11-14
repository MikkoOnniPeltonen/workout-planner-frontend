
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

function Statistics({ workouts, muscleGroups }) {

    console.log('musclegroups from props: ', muscleGroups)
    console.log('workouts from props: ', workouts)
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

    const handleWorkoutSelect = (e) => {
        const workoutId = e.target.value
        const selected = workouts.find(workout => workout._id === workoutId)
        setSelectedWorkout(selected || null)
    }

    const getMuscleGroupNameById = (id) => {
        const muscleGroup = muscleGroups.find(group => group._id === id)
        return muscleGroup ? muscleGroup.name : null
    }


    useEffect(() => {

        if (!selectedWorkout) return

        const updateMuscleGroups = (workout) => {
            if (!workout || !Array.isArray(workout.exercises)) {
                console.error('Invalid workout data or exercisese are missing.')
                return
            }

            const muscleGroupsCount = {}

            workout.exercises.forEach((exercise) => {
                if (!exercise.belongsTo) return

                const seenMuscleGroups = new Set()

                exercise.belongsTo.forEach((muscleGroupId) => {
                    const muscleGroupName = getMuscleGroupNameById(muscleGroupId)
                    if (muscleGroupName && !seenMuscleGroups.has(muscleGroupName)) {
                        muscleGroupsCount[muscleGroupName] = (muscleGroupsCount[muscleGroupName] || 0) + 1
                        seenMuscleGroups.add(muscleGroupName)
                    }
                })
            })

            if (Object.keys(muscleGroupsCount).length > 0) {
                setData({
                    labels: Object.keys(muscleGroupsCount),
                    datasets: [{
                        label: 'Muscle Group Distribution',
                        data: Object.values(muscleGroupsCount),
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56',
                            '#4BC0C0', '#9966FF', '#FF9F40', '#8DD1E1'
                        ],
                    }]
                })
            } else {
                console.warn('No valid muscle group data to update chart.')
            }
        }

        updateMuscleGroups(selectedWorkout)
        console.log('Data for pie chart: ', data)
    }, [selectedWorkout])
    
  return (
    <div>
      <h2>Workout Muscle Group Statistics</h2>
      <label htmlFor='workoutSelect'>Select a Workout:</label>
      <select id='workoutSelect' onChange={handleWorkoutSelect} value={selectedWorkout ? selectedWorkout._id : ''}>
        <option value="">-- Select a Workout --</option>
        {workouts.map((workout) => (
            <option key={workout._id} value={workout._id}>{workout.name}</option>
        ))}
      </select>

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
