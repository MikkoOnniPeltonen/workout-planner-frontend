import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import LoadingSpinner from "@/components/LoadingSpinner"
  
import axios from 'axios'
import { useEffect, useState } from 'react'

function AllExercisesPage() {

    const [allExercises, setAllExercises] = useState([])
    const [flippedCards, setFlippedCards] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const exercisesPerPage = 5

    useEffect(() => {

        const fetchExercises = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/exercises`)
                setAllExercises(response.data)
            } catch (error) {
                console.error(error, 'Error fetching exercises!')
            }
        }
        
        fetchExercises()
    }, [])

    const indexOfLastExercise = currentPage * exercisesPerPage
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
    const currentExercises = allExercises.slice(indexOfFirstExercise, indexOfLastExercise)

    const totalPages = Math.ceil(allExercises.length / exercisesPerPage)

    const handleCardFlip = (exerciseId) => {
        setFlippedCards(prev => ({
            ...prev,
            [exerciseId]: !prev[exerciseId]
        }))
    }

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1))
    }

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1))
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

  return (
    <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Exercises</h1>

        <div className="exercises-on-display grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allExercises.length === 0 ? <LoadingSpinner /> : (allExercises && 
                currentExercises.map((oneExercise) => {
                    return(
                        <div className={`exercise-card relative perspective-1000 transform-style-3d transition-all duration-300 ${flippedCards[oneExercise._id] ? 'flipped' : ''}`} key={oneExercise._id} onClick={() => handleCardFlip(oneExercise._id)}>
                            <div className={`front absolute w-full h-full backface-hidden transition-transform duration-700 ${flippedCards[oneExercise._id] ? '-rotate-y-180' : ''}`}>
                                <Card className="shadow-lg rounded-lg h-full">
                                    <CardHeader className="p-4 bg-gray-100">
                                        <CardTitle className="text-xl font-semibold">{oneExercise.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-gray-600">{oneExercise.description}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className={`back absolute w-full h-full backface-hidden transition-transform duration-700 ${flippedCards[oneExercise._id] ? 'rotate-y-0' : 'rotate-y-180'}`}>
                                <Card className="shadow-lg rounded-lg h-full bg-black text-white">
                                    <CardHeader className="p-4">
                                        <CardTitle>A way to Accelerate!</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p>{oneExercise.usedWith.flat().join(', ')}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>      
                    )
                })
            )}
        </div>

        {{/* Pagination */}}
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={goToPreviousPage} disabled={currentPage === 1} />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => goToPage(index + 1)} isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext onClick={goToNextPage} disabled={currentPage === totalPages}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    </div>
  )
}

export default AllExercisesPage
