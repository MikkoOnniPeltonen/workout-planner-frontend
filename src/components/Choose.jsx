import { useState, useEffect } from 'react'
import { Input } from "../components/ui/input"
import workoutService from '../services/workouts.service'
import musclegroupService from '../services/musclegroups.service'

function Choose({ userData=[], isEditMode = false }) {

    const [editedWorkoutId, setEditedWorkoutId] = useState('')
    const [allMuscleGroups, setAllMuscleGroups] = useState([])
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
    const [workoutName, setWorkoutName] = useState(isEditMode ? userData.name : '')
    const [step, setStep] = useState(1)

    useEffect(() => {

        const fetchMuscleGroups = async () => {
            try {
                const muscleGroups = await musclegroupService.getAllmusclegroups()
                if (Array.isArray(muscleGroups)) {
                    setAllMuscleGroups(muscleGroups)
                } else {
                    console.error('Fetched muscle groups is not an array.', muscleGroups)
                }
                
            } catch (error) {
                console.error('Error fetching muscle groups in component', error)
            }
        }
        fetchMuscleGroups()
    }, [])

    const handleWorkoutSelect = (workoutName) => {
        const selectedWorkout = userData.find(workout => workout.name === workoutName)
        setEditedWorkoutId(selectedWorkout._id)
        setWorkoutName(selectedWorkout.name)
        setSelectedMuscleGroups(selectedWorkout.exercises.flatMap(ex => ex.belongsTo))
        setStep(4)
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

            console.log('Submitting exercises', selectedMuscleGroups)
            console.log(workoutName)


            const selectedGroupIds = allMuscleGroups.filter((group) => selectedMuscleGroups.includes(group.name)).map((group) => group._id)

            const workoutData = {
                name: workoutName,
                exercises: selectedGroupIds
            }

            if (isEditMode) {

                await workoutService.updateWorkout(editedWorkoutId, workoutData)
            } else {
                await workoutService.createWorkout(workoutData)
                console.log('Workout created succesfully!')
            }
            setEditedWorkoutId('')
            setSelectedMuscleGroups([])
            setWorkoutName('')
            setStep(1)
        }
        catch (error) {
            console.error('Error submitting exercises', error)
        }
    }



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Exercise Plan</th>
                        <th scope='col'>No. Sets</th>
                        <th scope='col'>
                            {isEditMode ? (
                                <select value={workoutName} onChange={(e) => handleWorkoutSelect(e.target.value)}>
                                    <option value="">Select Workout</option>
                                    {userData.map(workout => (
                                        <option key={workout._id}>{workout.name}</option>
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
                            <button type='submit' className='btn btn-outline-success btn-lg' disabled={step !== 4} onClick={handleSubmit}>Go!</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default Choose
