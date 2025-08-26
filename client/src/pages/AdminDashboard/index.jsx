import { useEffect, useState } from 'react'
import { getAccommodations } from '../../api'
import { Navigation, List, Footer, AccommodationDetails } from '../../components'
import { useModal } from '../../hooks'
import AccommodationEdit from '../../components/AccommodationEdit'

export default function AdminDashboard() {
  const { openModal } = useModal()
  const [accommodations, setAccommodations] = useState([])

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await getAccommodations()
      setAccommodations(response?.accommodations)
    } catch (error) {
      console.log('Could not fetch accommodations: ', error)
    }
  }

  const onViewAccommodation = (accommodation) => {
    const handleSave = updatedAccommodation => onSaveAccommodation(updatedAccommodation)
    const handleDelete = () => onDeleteAccommodation(accommodation)
    openModal(
      <AccommodationDetails 
        accommodation={accommodation} 
        onSave={handleSave}
        onDelete={handleDelete}
      />
    )
  }

  const onCreateAccommodation = () => {
    const handleSave = newAccommodation => onSaveAccommodation(newAccommodation)
    openModal(<AccommodationEdit onSave={handleSave} />)
  }

  const onDeleteAccommodation = accommodation => {
    setAccommodations(prev => prev.filter(a => a.id !== accommodation.id))
  }

  const onSaveAccommodation = accommodation => {
    setAccommodations(prev => {
      const existingIndex = prev.findIndex(item => item.id === accommodation.id)
      if (existingIndex >= 0) {
        return prev.map(item => 
          item.id === accommodation.id ? accommodation : item
        )
      } 
      return [...prev, accommodation]
    })
  }

  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <List 
          label='Accommodations' 
          items={accommodations} 
          onCreate={onCreateAccommodation}
          onView={onViewAccommodation}
        />
      </div>
      <Footer />
    </div>
  )
}