import LoadingSpinner from "@/components/LoadingSpinner"

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ExerciseCard from "@/components/ExerciseCard"

function AllExercisesPage() {

    const [allExercises, setAllExercises] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [visibleExercises, setVisibleExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const [shownExerciseIds, setShownExerciseIds] = useState(new Set())
    const [currentMessage, setCurrentMessage] = useState(0)

    const motivationItems = [
        {
            icon: '/equipment/resistance-band.png',
            message: 'A way to Accelerate!'
        },
        {
            icon: '/equipment/barbell.png',
            message: 'Push Your Limits!'
        },
        {
            icon: '/equipment/dumbbell.png',
            message: "Strive for Progress!"
        }
    ]

    useEffect(() => {

        const fetchExercises = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/exercises`)
                setAllExercises(response.data)

                const initialVisible = response.data.slice(0,5).map((exercise, index) => ({
                    exercise,
                    index
                }))
                setVisibleExercises(initialVisible)

                const initialIds = new Set(initialVisible.map(ex => ex.exercise._id))
                setShownExerciseIds(initialIds)
            } catch (error) {
                console.error(error, 'Error fetching exercises!')
            } finally {
                setLoading(false)
            }
        }
        
        fetchExercises()
    }, [])

    const handleExerciseClick = (index) => {

        if (shownExerciseIds.size >= allExercises.length) {
            return
        }

        const newExercise = allExercises.find(exercise => !shownExerciseIds.has(exercise._id))

        if ( newExercise) {

            setVisibleExercises(prevExercises => {
                const newVisible = [...prevExercises]
                newVisible[index] = { exercise: newExercise, index }
                return newVisible
            })

            setShownExerciseIds(prev => new Set(prev).add(newExercise._id))
            setSelectedExercise(newExercise)
            setIsDrawerOpen(true)

            setCurrentMessage((prevItem) => (prevItem + 1) % motivationItems.length)
        }
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false)
        setSelectedExercise(null)
    }

  return (
        <div className="container mx-auto px-4 py-8">
            {shownExerciseIds.size >= allExercises.length ? (
                <Link to='/user' className='text-3xl font-bold mb-6 text-center text-blue-600'>
                    <h1>Time to Dominate</h1>
                </Link>
            ) : (
                <h1 className="text-3xl font-bold mb-6 text-center">Your Dominoes'</h1>
            )}
            

            <div className="exercise-card-container">
                {loading ? ( <LoadingSpinner /> ) : (allExercises && 
                    visibleExercises.map(({ exercise, index }) => (
                        <div key={exercise._id} className="cards-container" onClick={() => handleExerciseClick(index)} style={{ cursor: 'pointer' }}>
                            <ExerciseCard key={exercise._id} exercise={exercise}/>
                        </div> 
                )))}
            </div>

            <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
                <div className="drawer-header">
                    <button onClick={closeDrawer}>&times; Close</button>
                    <h3 className="text-lg font-semibold mb-2">
                        {motivationItems[currentMessage].message}
                    </h3>
                </div>
                <div className="drawer-content">
                    {selectedExercise && (
                        <>
                            <img src={motivationItems[currentMessage].icon} alt="Exercise icon" className="drawer-icon" />
                            <ul className="list-disc pl-4">
                                {selectedExercise.usedWith.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllExercisesPage
