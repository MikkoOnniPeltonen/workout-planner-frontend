
import { Link } from 'react-router-dom'
import {
  Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useEffect, useRef } from 'react'


function HomePage() {

  const cardRefs = useRef([null, null, null])
  const textRefs = useRef([null, null, null])


  useEffect(() => {

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (textRefs.current[index]) {
              textRefs.current[index].classList.add('in-view')
            }
          } else {
            entry.target.classList.remove('in-view')
            if (textRefs.current[index]) {
              textRefs.current[index].classList.remove('in-view')
            }
          }
        })
    }, options)
        
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index
        observer.observe(ref)
      } 
    })
    
    return () => observer.disconnect()

  }, [])


  return (
    <div className="w-full min-h-screen bg-gray-900 p-4 md:p-8 space-y-8">
      <article className='max-w-4xl mx-auto relative'>
        <div ref={(el) => (textRefs.current[0] = el)} className='text-overlay hidden-initial'>
          <div className='text-content'>
            <h2 className='text-3xl font-bold text-white mb-2'>How to go hard</h2>
            <h3 className='text-gray-200 text-lg'>The Strength inside you</h3>
          </div>
        </div>
        <Link to='user' className='block'>
          <Card ref={(el) => (cardRefs.current[0] = el)} className='img-card hidden-initial' style={{ position: 'relative', zIndex: 1 }}>
            <div className='overlay' />
            <img src="/person-running.webp" alt="person running" className='image' />
          </Card>
        </Link>

        <div ref={(el) => (textRefs.current[1] = el)} className='text-overlay hidden-initial'>
          <div className='text-content'>
            <h2 className='text-3xl font-bold text-white mb-2'>How to keep a balance</h2>
            <h3 className='text-purple-400 font-semibold'>The other side of you</h3>
          </div>
        </div>
        <Card ref={(el) => (cardRefs.current[1] = el)} className='img-card hidden-initial' style={{ position: 'relative', zIndex: 2 }}>
          <div className='overlay' />
          <img src="/person-relaxing.webp" alt="person relaxing" className='image' />
        </Card>

        <div ref={(el) => (textRefs.current[2] = el)} className='text-overlay hidden-initial'>
          <div className='text-content'>
            <h2 className='text-3xl font-bold text-white mb-2'>Your way of doing greatness</h2>
            <h6 className='mb-4 text-gray-700'>Remembering how to see beauty in fatigue</h6>
            <h1>&</h1>
            <h3 className='text-gray-200 text-lg'>Get to know yourself to the last drop of sweat</h3>
            <Link to='/exercises'><Button type="button" className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 text-lg">Start your journey</Button></Link>
          </div>
        </div>
        <Card ref={(el) => (cardRefs.current[2] = el)} className='img-card hidden-initial' style={{ position: 'relative', zIndex: 3 }}>
          <div className='overlay' />
            <img src="/future-self.webp" alt="future self" className='image' />
        </Card>

      </article>
    </div>
  )
}

export default HomePage
