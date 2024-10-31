
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-900 p-4 md:p-8">
      <article className='max-w-4xl mx-auto space-y-8'>
        <Link to='user' className='block'>
          <Card className='relative w-full h-[60vh] overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-trasparent z-10' />
            <img src="/person-running.webp" alt="person running" className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
            <CardContent className='relative h-full z-20 flex flex-col justify-end p-6'>
              <div className='flex items-center gap-2 mb-2'>
                <h2 className='text-3xl font-bold text-white mb-2'>How to go hard</h2>
                <h3 className='text-gray-200 text-lg mb-4'>The Strength inside you</h3>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className='relative w-full h-[60vh] overflow-hidden group'>
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10' />
          <img src="/person-relaxing.webp" alt="person relaxing" className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
          <CardContent className='relative h-full z-20 flex flex-col justify-end p-6'>
              <h2 className='text-3xl font-bold text-white mb-2'>How to keep a balance</h2>
              <h3 className='text-purple-400 font-semibold'>The other side of you</h3>
          </CardContent>
          <CardFooter>
            <h6 className='mb-4 text-gray-700'>Remembering how to see beauty in fatigue</h6>
          </CardFooter>
        </Card>
      </article>
      <article className='max-w-4xl mx-auto space-y-6'>
        <Card className='relative w-full h-[60vh] overflow-hidden group'>
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10' />
            <img src="/future-self.webp" alt="future self" className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
          <CardContent className='relative h-full z-20 flex flex-col justify-end p-6'>
            <h2 className='text-3xl font-bold text-white mb-2'>Your way of doing greatness</h2>
            <h3 className='text-gray-200 text-lg mb-6'>Get to know yourself to the last drop of sweat</h3>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to='/exercises'><button type="button" size='lg' className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 text-lg flex items-center gap-2">Start your journey</button></Link>
          </CardFooter>
        </Card>
      </article>
    </div>
  )
}

export default HomePage
