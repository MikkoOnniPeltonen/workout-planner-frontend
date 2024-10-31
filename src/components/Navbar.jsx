
import { NavLink } from 'react-router-dom'

import { useContext } from 'react'
import { ThemeContext } from '../context/theme.context'

function Navbar() {

    const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className={'Navbar ' + theme}>
        <div className='nav-links'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/signup'>Sign up</NavLink>
          <NavLink to='/login'>Log in</NavLink>
        </div>
        <button className='theme-btn' onClick={toggleTheme}>
            {theme === 'light' ? 'dark' : 'light'}
        </button>
    </nav>
  )
}

export default Navbar
