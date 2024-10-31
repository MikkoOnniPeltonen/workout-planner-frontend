import { ThemeProviderWrapper } from './context/theme.context.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/auth.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProviderWrapper>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </ThemeProviderWrapper>

  </BrowserRouter>,
)
