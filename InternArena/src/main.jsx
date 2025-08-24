import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './screens/LandingPage/LandingPage'
import MatchConfig from './screens/MatchConfig/MatchConfig'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<LandingPage/>*/}
    <MatchConfig/>
  </StrictMode>,
)
