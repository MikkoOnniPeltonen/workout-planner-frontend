import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/auth.context.jsx'
import { ThemeProviderWrapper } from './context/theme.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ThemeProviderWrapper>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </ThemeProviderWrapper>
  </BrowserRouter>,
)
