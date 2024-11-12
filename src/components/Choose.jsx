import { useState, useEffect } from 'react'
import { Input } from "../components/ui/input"
import workoutService from '../services/workouts.service'
import { toast } from 'react-hot-toast'

function Choose({ workouts, muscleGroups, isEditMode=false }) {

    const [editedWorkoutId, setEditedWorkoutId] = useState('')
    const [allMuscleGroups, setAllMuscleGroups] = useState(muscleGroups)
    const [allWorkouts, setAllWorkouts] = useState(workouts)
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
    const [workoutName, setWorkoutName] = useState('')
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => {
        if (muscleGroups) {
            setAllMuscleGroups(muscleGroups)
        }
    }, [muscleGroups])


    useEffect(() => {
        if (workouts) {
            setAllWorkouts(workouts)
        }
    }, [workouts])

    const initializeEditMode = (workout) => {
        setEditedWorkoutId(workout._id)
        setWorkoutName(workout.name)
        setSelectedMuscleGroups(workout.exercises.map(ex => ex.belongsTo))
        console.log('EDIT MUSCLEGROUP: ', selectedMuscleGroups)
        setStep(4)
    }

    const handleWorkoutSelect = (workoutName) => {

        const selectedWorkout = allWorkouts.find(workout => workout.name === workoutName)

        if (selectedWorkout) {
            initializeEditMode(selectedWorkout)
        }
    }

    const handleSelection = (muscleGroupName) => {

        let newSelectedGroups = ['Core']

        if (muscleGroupName === 'Legs' || muscleGroupName === 'Back') {
                
            if (!newSelectedGroups.includes(muscleGroupName)) {
                newSelectedGroups.push(muscleGroupName)
            } else {
                newSelectedGroups = [...newSelectedGroups, ...selectedMuscleGroups.slice(1)]
            }
            setStep(2)

        } else {

            newSelectedGroups = [
                ...newSelectedGroups,
                ...selectedMuscleGroups.slice(1).filter(group => group !== muscleGroupName)
            ]

            if (!newSelectedGroups.includes(muscleGroupName) && muscleGroupName !== 'Core') {
                newSelectedGroups.push(muscleGroupName)
            }

            if (newSelectedGroups.length >= 3) {
                setStep(3)
            }
        }
        setSelectedMuscleGroups(newSelectedGroups)
        console.log(selectedMuscleGroups)
    }

    const handleSubmit = async () => {

        try {
            setIsSubmitting(true)
            console.log('Submitting exercises', selectedMuscleGroups)
            console.log(workoutName)


            const selectedGroupIds = allMuscleGroups.filter((group) => selectedMuscleGroups
            .includes(group.name)).map((group) => group._id)

            console.log('exercises so far: ', selectedGroupIds)
            const workoutData = {
                name: workoutName,
                exercises: selectedGroupIds
            }

            if (isEditMode) {

                await workoutService.updateWorkout(editedWorkoutId, workoutData)
                toast.success('Workout updated succesfully!')
            } else {
                await workoutService.createWorkout(workoutData)
                console.log('Workout created succesfully!')
                toast.success('Workout created succesfully!')
            }
            
            resetForm()
        }
        catch (error) {
            console.error('Error submitting workouts', error)
            toast.error('Something went wrong.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setEditedWorkoutId('')
        setSelectedMuscleGroups([])
        setWorkoutName('')
        setStep(1)
    }


    return (
        <div>
            <table className='table-workout'>
                <thead>
                    <tr>
                        <th scope='col'>Exercise Plan</th>
                        <th scope='col'>No. Sets</th>
                        <th scope='col'>
                            {isEditMode ? (
                                <select value={workoutName} onChange={(e) => handleWorkoutSelect(e.target.value)}>
                                    <option value="">Select Workout</option>
                                    {workouts.map(workout => (
                                        <option key={workout._id} value={workout.name}>{workout.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <Input required value={workoutName} type='text' placeholder='Choose name' onChange={(e) => {setWorkoutName(e.target.value)}} />
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={step === 1 ? '' : 'done'}>
                        <th scope='row'>First</th>
                        <td>
                            3 Rounds
                        </td>
                        <td>
                            <div className="btn-group" role="group" aria-label='Basic radio toggle button group'>
                        
                                <input type="radio" className='btn-check' name='btnradio' id='btnradio1' autoComplete="off"/>
                                <label className="btn btn-outline-primary" htmlFor='btnradio1' onClick={() => handleSelection('Legs')}>Legs</label>
                        
                                <input type="radio" className='btn-check' name='btnradio' id='btnradio2' autoComplete="off"/>
                                <label className="btn btn-outline-primary" htmlFor='btnradio2' onClick={() => handleSelection('Back')}>Back</label>
                            </div>
                        </td>
                    </tr>
                    <tr className={step < 2 ? 'disabled' : step === 2 ? '' : 'done'}>
                        <th scope='row'>Next</th>
                        <td>
                            2 Rounds
                        </td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
    
                                <input type="checkbox" className='btn-check' id="btncheck1" autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck1" onClick={() => handleSelection('Chest')} disabled={step !== 1}>Chest</label>

                                <input type="checkbox" className='btn-check' id="btncheck2" autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck2" onClick={() => handleSelection('Upper Back')} disabled={step !== 1}>Upper Back</label>
                    
                                <input type="checkbox" className='btn-check' id="btncheck3" autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck3" onClick={() => handleSelection('Shoulders')} disabled={step !== 1}>Shoulders</label>
                    
                                <input type="checkbox" className='btn-check' id="btncheck4" autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck4" onClick={() => handleSelection('Arms')} disabled={step !== 1}>Arms</label>
                            </div>
                        </td>
                    </tr>
                    <tr className={step < 3 ? 'disabled' : step === 3 ? '' : 'done'}>
                        <th scope='row'>Until</th>
                        <td>
                            1 Round
                        </td>
                        <td>
                            <button type="button" className='btn btn-primary' onClick={() => setStep(4)} disabled={step !== 3}>Core</button>
                        </td>
                    </tr>
                    <tr className={step < 4 ? 'disabled' : ''}>
                        <th scope='row'>Ready</th>
                        <td>
                            Set
                        </td>
                        <td>
                            <button type='submit' className='btn btn-outline-success btn-lg' disabled={step !== 4} onClick={handleSubmit}>{isSubmitting ? 'Saving': 'Go!'}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default Choose
