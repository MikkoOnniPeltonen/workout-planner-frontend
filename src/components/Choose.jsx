import { useState } from 'react'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import exerciseService from '@/services/exercises.service'
import workoutService from '@/services/workouts.service'

function Choose( exercises= {}, userData = {}, isEditMode = false ) {

    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
    const [workoutName, setWorkoutName] = useState(isEditMode ? userData.name : '')
    const [step, setStep] = useState(1)


    const handleWorkoutSelect = (workoutName) => {
        const selectedWorkout = userData.find(workout => workout.name === workoutName)
        setWorkoutName(selectedWorkout.name)
        setSelectedMuscleGroups(selectedWorkout.exercises.flatMap(ex => ex.belongsTo))
        setStep(4)
    }

    const handleSelection = (muscleGroupName) => {

        console.log('How many', step)
        console.log('musclegroup names: ', muscleGroupName)
        
        if (selectedMuscleGroups.includes(muscleGroupName)) {
            setSelectedMuscleGroups(selectedMuscleGroups.filter(name => name !== muscleGroupName))
        } else {
            setSelectedMuscleGroups([...selectedMuscleGroups, muscleGroupName])
            if (step < 3) {
                setStep(step + 1)
            }
        }
        console.log(selectedMuscleGroups)
        
    }

    console.log(exercises)


    const handleSubmit = async () => {

        if (selectedMuscleGroups.length === 0) {
            console.error('No Muscle groups selected.')
            return
        }

        try {

            console.log('Submitting exercises', selectedMuscleGroups)
            
            const getExercisesByMuscleGroup = await exerciseService.getExercisesByMuscleGroups(selectedMuscleGroups)

            const dataToBackend = { name: workoutName, exercises: getExercisesByMuscleGroup.data }

            if (isEditMode) {

                await workoutService.updateWorkout(userData._id, dataToBackend)
            } else {
                await workoutService.createWorkout(dataToBackend)
            }
        
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
                                <Input value={workoutName} type='text' placeholder='Choose name' onChange={(e) => {setWorkoutName(e.target.value)}} />
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
                                <label className="btn btn-outline-primary" htmlFor="btncheck2" onClick={() => handleSelection('Upper back')} disabled={step !== 1}>Upper back</label>
                    
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
                            <button type="button" className='btn btn-primary' onClick={() => handleSelection('Core')} disabled={step !== 3}>Core</button>
                        </td>
                    </tr>
                    <tr className={step < 3 ? 'disabled' : ''}>
                        <th scope='row'>Ready</th>
                        <td>
                            Set
                        </td>
                        <td>
                            <button type='submit' className='btn btn-outline-success btn-lg' disabled={step !== 3} onClick={handleSubmit}>Go!</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default Choose
