import { useEffect, useState, useRef } from 'react'
import { getUsers, getAccommodations, getAccommodation, getRestaurants, getActivities, getBookings } from '../../api'
import { 
  Navigation, 
  Button, 
  Footer, 
  UserDetails, 
  AccommodationDetails, 
  AccommodationEdit, 
  RestaurantDetails, 
  RestaurantEdit,
  ActivityDetails,
  ActivityEdit,
  BookingDetails
} from '../../components'
import { useModal, useSession } from '../../hooks'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import './styles.scss'

const Tab = {
  USERS: 'Users',
  ACCOMMODATIONS: 'Accommodations',
  RESTAURANTS: 'Restaurants',
  ACTIVITIES: 'Activities',
  BOOKINGS: 'Bookings',
}

export default function AdminDashboard() {
  const { openModal } = useModal()
  const { me } = useSession()
  const [currentTab, setCurrentTab] = useState(Tab.USERS)
  const [items, setItems] = useState([])
  const [bookingsFilter, setBookingsFilter] = useState('all')
  const searchRef = useRef()

  useEffect(() => { search() }, [currentTab, bookingsFilter])

  const search = async () => {
    const searchTerm = searchRef.current.value.trim()
    const query = searchTerm ? { name: searchTerm } : null
    try {
      switch (currentTab) {
        case Tab.USERS:
          {
            const response = await getUsers(query)
            setItems(response?.users?.sort((a,b) => a.lastName.localeCompare(b.lastName)))
          }
          break
        case Tab.ACCOMMODATIONS:
          {
            const response = await getAccommodations(query)
            setItems(response?.accommodations?.sort((a,b) => a.name.localeCompare(b.name)))
          }
          break
        case Tab.RESTAURANTS:
          {
            const response = await getRestaurants(query)
            setItems(response?.restaurants?.sort((a,b) => a.name.localeCompare(b.name)))
          }
          break
        case Tab.ACTIVITIES:
          {
            const response = await getActivities(query)
            setItems(response?.activities?.sort((a,b) => a.name.localeCompare(b.name)))
          }
          break
        case Tab.BOOKINGS:
          {
            const response = await getBookings(query)
            let bookings = response?.bookings?.sort((a, b) => {
              return new Date(a.startDate) - new Date(b.startDate)
            }) || []
            
            const filtered = bookings.filter(booking => {
              switch (bookingsFilter) {
                case 'all': return booking
                case 'confirmed': 
                  return booking.status == 'confirmed'
                case 'pendingCancellation': 
                  return booking.status == 'pendingCancellation'
                case 'completed': 
                  return booking.status == 'completed'
                default: return booking
              }
            })
            setItems(filtered)
          }
          break
      }
    } catch (error) {
      console.log(`Could not fetch data for ${currentTab}: `, error)
    }
  }

  const clearFilter = () => {
    searchRef.current.value = ''
    setBookingsFilter('all')
    search()
  }

  const onView = item => {

    switch (currentTab) {
      case Tab.USERS: openModal(<UserDetails user={item} />); break
      case Tab.ACCOMMODATIONS: openModal(<AccommodationDetails accommodation={item} onSave={search} onDelete={search} onRefresh={()=>onRefreshAccommodation(item)} />); break
      case Tab.RESTAURANTS: openModal(<RestaurantDetails restaurant={item} onSave={search} onDelete={search} />); break
      case Tab.ACTIVITIES: openModal(<ActivityDetails activity={item} onSave={search} onDelete={search} />); break
      case Tab.BOOKINGS: openModal(<BookingDetails booking={item} onDelete={search} />); break
    }
  }

  const onCreate = () => {
    switch (currentTab) {
      case Tab.ACCOMMODATIONS: openModal(<AccommodationEdit onSave={search} />); break
      case Tab.RESTAURANTS: openModal(<RestaurantEdit onSave={search} />); break
      case Tab.ACTIVITIES: openModal(<ActivityEdit onSave={search} />); break
    }
  }

  const onRefreshAccommodation = async (accommodation) => {
    try {
      const response = await getAccommodation(accommodation.id)
      onView(response?.accommodation)
      search()
    } catch (error) {
      console.log('Could not refresh accommodation:', error)
    }
  }

  return (
    <div className='admin-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <div className='section'>
          <h1>Admin Dashboard</h1>
          <p className='emphasized-small'>{`Welcome, ${me?.firstName} ${me?.lastName}.`}</p>
        </div>
        <div className='row'>
          <Button inverted={currentTab != Tab.USERS} text='Users' onClick={()=>setCurrentTab(Tab.USERS)}/>
          <Button inverted={currentTab != Tab.ACCOMMODATIONS} text='Accommodations' onClick={()=>setCurrentTab(Tab.ACCOMMODATIONS)}/>
          <Button inverted={currentTab != Tab.RESTAURANTS} text='Restaurants' onClick={()=>setCurrentTab(Tab.RESTAURANTS)}/>
          <Button inverted={currentTab != Tab.ACTIVITIES} text='Activities' onClick={()=>setCurrentTab(Tab.ACTIVITIES)}/>
          <Button inverted={currentTab != Tab.BOOKINGS} text='Bookings' onClick={()=>setCurrentTab(Tab.BOOKINGS)}/>
        </div>
        <div className='content col'>
          <div className='row'>
            <h2>{currentTab}</h2>
            {![Tab.USERS, Tab.BOOKINGS].includes(currentTab) && <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreate} />}
          </div>
          <div className='row'>
            {currentTab == Tab.BOOKINGS && 
              <select value={bookingsFilter} onChange={e=>setBookingsFilter(e.target.value)}>
                <option value='all'>All</option>
                <option value='confirmed'>Confirmed</option>
                <option value='completed'>Completed</option>
                <option value='pendingCancellation'>Pending Cancellation</option>
              </select>
            }
            <input type='text' placeholder={`Search ${currentTab}..`} ref={searchRef} />
            <Button small short text='Search' onClick={search} />
            <Button small short inverted border text='Clear Filter' onClick={clearFilter} />
          </div>
          <p>{`Showing ${items.length} results`}</p>
          <div className='items-list col'>
            {items.map(item => <ItemCell key={item.id} item={item} onView={()=>onView(item)} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const ItemCell = ({ item, onView }) => {
  const time = item?.startTime || item.bookableDetails?.checkInTime || ''
  const title = item?.name || item?.bookableDetails?.name || `${item?.firstName} ${item?.lastName}` || ''
  const subtitle = item.location || item.email || `${item?.startDate} ${time}` || ''
  const user = item?.userDetails ? `${item.userDetails.firstName} ${item.userDetails.lastName}` : ''
  
  const getStatus = () => {
    if (item.status === 'pendingCancellation') return 'Pending Cancellation'
    if (item.status === 'completed') return 'Completed'
    return 'Confirmed'
  }

  return (
    <div className='item-cell row'>
      <div>
        <p>{title}</p>
        <p className='subtitle'>{subtitle}</p>
        {user && <p className='subtitle'>{user}</p>}
      </div>
      <div className='row'>
        {item?.status && <p className='status'>{getStatus()}</p>}
        <Button backgroundless small icon={<InfoIcon onClick={onView} />} />
      </div>
    </div>
  )
}