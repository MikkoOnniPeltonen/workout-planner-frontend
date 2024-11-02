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
import ExerciseCard from "@/components/ExerciseCard"

function AllExercisesPage() {

    const [allExercises, setAllExercises] = useState([])
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Dominoes'</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {allExercises.length === 0 ? ( <LoadingSpinner /> ) : (allExercises && 
                    currentExercises.map((oneExercise) => (
                        <ExerciseCard key={oneExercise._id} exercise={oneExercise}/>
                )))}
            </div>

            <div className="flex justify-center mt-8">
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
