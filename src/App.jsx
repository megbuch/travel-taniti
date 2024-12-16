import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/index'
import './styles.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
