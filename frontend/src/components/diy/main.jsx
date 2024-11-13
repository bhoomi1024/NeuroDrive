import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './OgMain.jsx'
import Footer from "./components/HomePageCompo/Nav";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
