import { useEffect, useState, useRef } from 'react'
import { getUsers, getAccommodations, getRestaurants, getActivities } from '../../api'
import { toast } from 'react-toastify'
import { 
  Navigation, 
  List, 
  Button, 
  Footer, 
  UserDetails, 
  AccommodationDetails, 
  AccommodationEdit, 
  RestaurantDetails, 
  RestaurantEdit,
  ActivityDetails,
  ActivityEdit
} from '../../components'
import { useModal, useSession } from '../../hooks'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Tab = {
  USERS: 'Users',
  ACCOMMODATIONS: 'Accommodations',
  RESTAURANTS: 'Restaurants',
  ACTIVITIES: 'Activities'
}

export default function AdminDashboard() {
  const { openModal } = useModal()
  const [currentTab, setCurrentTab] = useState(Tab.USERS)
  const [items, setItems] = useState([])
  const searchRef = useRef()
  const { me, isAuthenticated } = useSession()

  useEffect(() => { fetchData() }, [currentTab])

  const fetchData = async (query) => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('No token available, skipping fetch')
      return
    }
    try {
      switch (currentTab) {
        case Tab.USERS:
          {
            const response = await getUsers(query)
            setItems(response?.users)
          }
          break
        case Tab.ACCOMMODATIONS:
          {
            const response = await getAccommodations(query)
            setItems(response?.accommodations)
          }
          break
        case Tab.RESTAURANTS:
          {
            const response = await getRestaurants(query)
            setItems(response?.restaurants)
          }
          break
        case Tab.ACTIVITIES:
          {
            const response = await getActivities(query)
            setItems(response?.activities)
          }
          break
      }
    } catch (error) {
      console.log(`Could not fetch data for ${currentTab}: `, error)
    }
  }

  const onView = item => {
    const handleSave = updatedItem => onSave(updatedItem)
    const handleDelete = () => onDelete(item)
    switch (currentTab) {
      case Tab.USERS: openModal(<UserDetails user={item} />); break
      case Tab.ACCOMMODATIONS: openModal(<AccommodationDetails accommodation={item} onSave={handleSave} onDelete={handleDelete} />); break
      case Tab.RESTAURANTS: openModal(<RestaurantDetails restaurant={item} onSave={handleSave} onDelete={handleDelete} />); break
      case Tab.ACTIVITIES: openModal(<ActivityDetails activity={item} onSave={handleSave} onDelete={handleDelete} />); break
    }
  }

  const onCreate = () => {
    switch (currentTab) {
      case Tab.ACCOMMODATIONS: openModal(<AccommodationEdit onSave={onSave} />); break
      case Tab.RESTAURANTS: openModal(<RestaurantEdit onSave={onSave} />); break
      case Tab.ACTIVITIES: openModal(<ActivityEdit onSave={onSave} />); break
    }
  }

  const onDelete = item => {
    setItems(prev => prev.filter(i => i.id === item.id))
  }

  const onSave = item => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id)
      if (existingIndex >= 0) { 
        return prev.map(i => i.id === item.id ? item : i)
      } 
      return [...prev, item]
    })
  }

  const search = () => {
    const searchTerm = searchRef.current.value.trim()
    fetchData({ name: searchTerm })
  }

  const clearFilter = () => {
    searchRef.current.value = ''
    fetchData()
  }

  // if (!isAuthenticated || !me) window.location.href = '/'
  // if (me.role !== 'admin') window.location.href = '/'
  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <div className='row'>
          <Button inverted={currentTab != Tab.USERS} text='Users' onClick={()=>setCurrentTab(Tab.USERS)}/>
          <Button inverted={currentTab != Tab.ACCOMMODATIONS} text='Accommodations' onClick={()=>setCurrentTab(Tab.ACCOMMODATIONS)}/>
          <Button inverted={currentTab != Tab.RESTAURANTS} text='Restaurants' onClick={()=>setCurrentTab(Tab.RESTAURANTS)}/>
          <Button inverted={currentTab != Tab.ACTIVITIES} text='Activities' onClick={()=>setCurrentTab(Tab.ACTIVITIES)}/>
        </div>
        <div className='row'>
          <h2>{currentTab}</h2>
          {currentTab !== Tab.USERS && <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreate} />}
        </div>
        <div className='row'>
          <input type='text' placeholder={`Search ${currentTab}..`} ref={searchRef} />
          <Button small short text='Search' onClick={search} />
          <Button small short inverted border text='Clear Filter' onClick={clearFilter} />
        </div>
        <List items={items} onView={onView} />
      </div>
      <Footer />
    </div>
  )
}
