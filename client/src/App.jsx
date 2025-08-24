import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { ModalProvider, SessionProvider } from './hooks'
import { Modal } from './components'
import LandingPage from './pages/LandingPage/index'
import ActivitiesPage from './pages/ActivitiesPage/index'
import DiningPage from './pages/DiningPage/index'
import LodgingPage from './pages/LodgingPage/index'
import TransportationPage from './pages/TransportationPage/index'
import ReferencesPage from './pages/ReferencesPage/index'
import TravelerDashboard from './pages/TravelerDashboard/index'
import AdminDashboard from './pages/AdminDashboard';
import './global/styles.scss'

function App() {
  return (
    <ModalProvider>
      <SessionProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/activities' element={<ActivitiesPage />} />
          <Route path='/dining' element={<DiningPage />} />
          <Route path='/lodging' element={<LodgingPage />} />
          <Route path='/transportation' element={<TransportationPage />} />
          <Route path='/references' element={<ReferencesPage />} />
          <Route path='/dashboard' element={<ReferencesPage />} />
          <Route path='/traveler-dashboard' element={<TravelerDashboard />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Routes>
        <Modal />
        <ToastContainer closeButton={false} />
      </SessionProvider>
    </ModalProvider>
  )
}

export default App
