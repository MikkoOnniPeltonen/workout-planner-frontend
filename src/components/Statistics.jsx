
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

function Statistics({ workouts }) {

    const [chartWorkouts, setChartWorkouts] = useState([])
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

        if (workouts && workouts.length > 0) {
            setChartWorkouts(workouts)
            updateMuscleGroups(workouts)
        }
    }, [workouts])

    const updateMuscleGroups = (workouts) => {
        const muscleGroups = {
            Legs: 0,
            Back: 0,
            Chest: 0,
            'Upper back': 0,
            Shoulders: 0,
            Arms: 0,
            Core: 0,
        }

        workouts.forEach((workout) => {
            workout.exercises.forEach((exercise) => {
                if (muscleGroups.hasOwnProperty(exercise)) {
                    muscleGroups[exercise]++
                }
            })
        })

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
    }
    
  return (
    <div>
      <h2>Workout Muscle Group Statistics</h2>
      <Pie data={data} />
    </div>
  )
}

export default Statistics
