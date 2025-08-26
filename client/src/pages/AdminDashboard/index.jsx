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
      console.log('Could not fetch accommodations.')
    }
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

  const onViewAccommodation = accommodation => {
    openModal(<AccommodationDetails accommodation={accommodation} onSave={onSaveAccommodation} />)
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
          onCreate={()=>openModal(<AccommodationEdit onSave={onSaveAccommodation} />)}
          onView={onViewAccommodation}
        />
      </div>
      <Footer />
    </div>
  )
}