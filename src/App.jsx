import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import ErrorPage from './pages/ErrorPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AllExercisesPage from './pages/AllExercisesPage'

import IsPrivate from './components/IsPrivate'
import IsAnon from './components/IsAnon'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/user'} element={<IsPrivate><UserPage /></IsPrivate>} />
        <Route path={'/exercises'} element={<AllExercisesPage />} />
        <Route path={'/signup'} element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path={'/login'} element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path={'/*'} element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
