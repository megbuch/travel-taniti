import { useEffect, useState } from 'react'
import { getAccommodations } from '../../api'
import { Navigation, List } from '../../components'
import { useModal } from '../../hooks'
import AccommodationEdit from './AccommodationEdit'

export default function AdminDashboard() {
  const { openModal, closeModal } = useModal()
  const [accommodations, setAccommodations] = useState([])

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await getAccommodations()
      setAccommodations(response?.accommodations)
    } catch (error) {
      console.log('Could not fetch accommodations.')
    }
  }

  const onSaveAccommodation = accommodation => {
    setAccommodations(prev => [...prev, accommodation])
    closeModal()
  }

  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <List label='Accommodations' items={accommodations} onAdd={()=>openModal(<AccommodationEdit onSave={onSaveAccommodation} onCancel={closeModal} />)} />
      </div>
    </div>
  )
}