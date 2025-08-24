import { useEffect, useState } from 'react'
import { getAccommodations } from '../../api'
import { Navigation, List } from '../../components'

export default function AdminDashboard() {
  const [accommodations, setAccommodations] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getAccommodations()
      setAccommodations(response?.accommodations)
    } catch (error) {
      console.log('Could not fetch accommodations.')
    }
  }

  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <List label='Accommodations' items={accommodations} />
      </div>
    </div>
  )
}