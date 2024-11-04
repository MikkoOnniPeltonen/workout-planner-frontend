
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

function Statistics(workouts) {

    const [chartWorkouts, setChartWorkouts] = useState([])
    setChartWorkouts(workouts)

    const muscleGroups = {
        Legs: 0,
        Back: 0,
        Chest: 0,
        'Upper back': 0,
        Shoulders: 0,
        Arms: 0,
        Core: 0
    }

    chartWorkouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            if (muscleGroups[exercise]) {
                muscleGroups[exercise] +1
            }
        })
    })

    const data = {
        labels: Object.keys(muscleGroups),
        datasets: [
            {
                label: "Muscle Group Distribution",
                data: Object.values(muscleGroups),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
            }
        ]
    }
  return (
    <div>
      <h2>Workout Muscle Group Statistics</h2>
      <Pie data={data} />
    </div>
  )
}

export default Statistics
