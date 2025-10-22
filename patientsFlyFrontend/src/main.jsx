import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './component/context/ThemeContext.jsx'
import { AuthProvider } from './component/context/auth.jsx'
import { LanguageProvider } from './component/context/useLanguage.jsx'
import { ToastProvider } from './component/context/toast.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider> 
            <LanguageProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </LanguageProvider>
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
