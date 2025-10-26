import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import SimpleForm from './Simpleform.jsx'
import ChatApp from './ChatApp.jsx'
import Jsom from './Jsom.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Jsom/> */}
    <App/>
  </StrictMode>,
)
