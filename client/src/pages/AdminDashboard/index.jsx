import { useEffect, useState } from 'react'
import { getUsers, getAccommodations, getRestaurants, getActivities } from '../../api'
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
  const [activities, setActivities] = useState([])
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
        case Tab.ACTIVITIES:
          {
            const response = await getActivities()
            setActivities(response?.activities)
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
      const existingIndex = prev.findIndex(a => a.id === accommodation.id)
      if (existingIndex >= 0) {
        return prev.map(a => a.id === accommodation.id ? accommodation : a)
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
    setRestaurants(prev => prev.filter(r => r.id !== restaurant.id))

  const onSaveRestaurant = restaurant => {
    setRestaurants(prev => {
      const existingIndex = prev.findIndex(r => r.id === restaurant.id)
      if (existingIndex >= 0) {
        return prev.map(r => r.id === restaurant.id ? restaurant : r)
      } 
      return [...prev, restaurant]
    })
  }

  const onViewActivity = activity => {
    const handleSave = updatedActivity => onSaveActivity(updatedActivity)
    const handleDelete = () => onDeleteActivity(activity)
    openModal(
      <ActivityDetails 
        activity={activity} 
        onSave={handleSave}
        onDelete={handleDelete}
      />
    )
  }

  const onCreateActivity = () => 
    openModal(<ActivityEdit onSave={onSaveActivity} />)

  const onDeleteActivity = activity =>
    setActivities(prev => prev.filter(a => a.id !== activity.id))

  const onSaveActivity = activity => {
    setActivities(prev => {
      const existingIndex = prev.findIndex(a => a.id === activity.id)
      if (existingIndex >= 0) { 
        return prev.map(a => a.id === activity.id ? activity : a)
      } 
      return [...prev, activity]
    })
  }

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
        {currentTab == Tab.ACTIVITIES &&
          <>
            <div className='row'>
              <h2>Activities</h2>
              <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreateActivity} />
            </div>          
            <List items={activities} onView={onViewActivity} />
          </>
        }
      </div>
      <Footer />
    </div>
  )
}
