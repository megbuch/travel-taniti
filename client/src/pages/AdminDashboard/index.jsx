import { useEffect, useState } from 'react'
import { getUsers, getAccommodations, getRestaurants } from '../../api'
import { 
  Navigation, 
  List, 
  Button, 
  Footer, 
  UserDetails, 
  AccommodationDetails, 
  AccommodationEdit, 
  RestaurantDetails, 
  RestaurantEdit 
} from '../../components'
import { useModal } from '../../hooks'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Tab = {
  USERS: 'users',
  ACCOMMODATIONS: 'accommodations',
  RESTAURANTS: 'restaurants',
  ACTIVITIES: 'activities'
}

export default function AdminDashboard() {
  const { openModal } = useModal()
  const [currentTab, setCurrentTab] = useState(Tab.USERS)
  const [accommodations, setAccommodations] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => { fetchData() }, [currentTab])

  const fetchData = async () => {
    try {
      switch (currentTab) {
        case Tab.USERS:
          {
            const response = await getUsers()
            setUsers(response?.users)
          }
          break
        case Tab.ACCOMMODATIONS:
          {
            const response = await getAccommodations()
            setAccommodations(response?.accommodations)
          }
          break
        case Tab.RESTAURANTS:
          {
            const response = await getRestaurants()
            setRestaurants(response?.restaurants)
          }
          break
      }
    } catch (error) {
      console.log(`Could not fetch data for ${currentTab}: `, error)
    }
  }

  const onViewUser = user => openModal(<UserDetails user={user} />)

  const onViewAccommodation = accommodation => {
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

  const onCreateAccommodation = () => 
    openModal(<AccommodationEdit onSave={onSaveAccommodation} />)

  const onDeleteAccommodation = accommodation =>
    setAccommodations(prev => prev.filter(a => a.id !== accommodation.id))

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

  const onViewRestaurant = restaurant => {
    const handleSave = updatedRestaurant => onSaveRestaurant(updatedRestaurant)
    const handleDelete = () => onDeleteRestaurant(restaurant)
    openModal(
      <RestaurantDetails 
        restaurant={restaurant} 
        onSave={handleSave}
        onDelete={handleDelete}
      />
    )
  }

  const onCreateRestaurant = () => 
    openModal(<RestaurantEdit onSave={onSaveRestaurant} />)

  const onDeleteRestaurant = restaurant =>
    setRestaurants(prev => prev.filter(a => a.id !== restaurant.id))

  const onSaveRestaurant = restaurant => {
    setRestaurants(prev => {
      const existingIndex = prev.findIndex(item => item.id === restaurant.id)
      if (existingIndex >= 0) {
        return prev.map(item => 
          item.id === restaurant.id ? restaurant : item
        )
      } 
      return [...prev, restaurant]
    })
  }

  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <div className='row'>
          <Button text='Users' onClick={()=>setCurrentTab(Tab.USERS)}/>
          <Button text='Accommodations' onClick={()=>setCurrentTab(Tab.ACCOMMODATIONS)}/>
          <Button text='Restaurants' onClick={()=>setCurrentTab(Tab.RESTAURANTS)}/>
        </div>
        {currentTab == Tab.USERS &&
          <>
            <h2>Users</h2>
            <List items={users} onView={onViewUser} />
          </>
        }
        {currentTab == Tab.ACCOMMODATIONS &&
          <>
            <div className='row'>
              <h2>Accommodations</h2>
              <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreateAccommodation} />
            </div>          
            <List items={accommodations} onView={onViewAccommodation} />
          </>
        }
        {currentTab == Tab.RESTAURANTS &&
          <>
            <div className='row'>
              <h2>Restaurants</h2>
              <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreateRestaurant} />
            </div>          
            <List items={restaurants} onView={onViewRestaurant} />
          </>
        }
      </div>
      <Footer />
    </div>
  )
}
