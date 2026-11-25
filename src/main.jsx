import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './globals.css'
import App from './lib/app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App ></App>
  </StrictMode>,
)
