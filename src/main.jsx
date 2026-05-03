import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './i18n'; // Assuming i18n is set up elsewhere
import './index.css'
import App from './App.jsx'
import { initTheme } from './utils/theme'; // Ensure theme is initialized early

// Initialize theme before render to prevent flash of default theme
initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
