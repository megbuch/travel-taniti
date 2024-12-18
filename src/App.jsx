import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from './global/ModalContext'
import { ContactForm } from './global/index'
import LandingPage from './pages/LandingPage/index'
import ActivitiesPage from './pages/ActivitiesPage/index'
import DiningPage from './pages/DiningPage/index'
import LodgingPage from './pages/LodgingPage/index'
import TransportationPage from './pages/TransportationPage/index'
import './global/styles.scss'

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/activities' element={<ActivitiesPage />} />
        <Route path='/dining' element={<DiningPage />} />
        <Route path='/lodging' element={<LodgingPage />} />
        <Route path='/transportation' element={<TransportationPage />} />
      </Routes>
      <ContactForm />
      <ToastContainer closeButton={false} />
    </ModalProvider>
  )
}

export default App
