import { useEffect, useState } from 'react'
import { getBookings } from '../../api'
import { Navigation, Button, BookingDetails, Report } from '../../components'
import { useModal } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import './styles.scss'

export default function TravelerDashboard() {
  const { openModal } = useModal()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('confirmed')
  const filteredBookings = bookings?.filter(booking => {
    switch (filter) {
      case 'all': return booking
      case 'confirmed': 
        return booking.status == 'confirmed'
      case 'pendingCancellation': 
        return booking.status == 'pendingCancellation'
      case 'completed': 
        return booking.status == 'completed'
    }
  })
  const dates = []
  filteredBookings?.forEach(booking => {
    if (!dates.includes(booking.startDate)) {
      dates.push(booking.startDate)
    }
  })
  
  useEffect(() => { fetchBookings() }, [])
  const fetchBookings = async () => {
    const response = await getBookings()
    const sortedBookings = response?.bookings?.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate)
    })
    setBookings(sortedBookings || [])
  }

  const getBookingsForDate = date => {
    const bookingsForDate = filteredBookings?.filter(booking => booking.startDate === date)
    bookingsForDate.sort((a, b) => {
      const timeA = a.startTime || a.bookableDetails.checkInTime || '00:00'
      const timeB = b.startTime || b.bookableDetails.checkInTime || '00:00'
      return timeA.localeCompare(timeB)
    })
    return bookingsForDate
  }

  const formatDate = date => {
    if (!date) return null
    const [year, month, day] = date.split('-').map(Number)
    const localDate = new Date(year, month - 1, day)
    return localDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const onViewBooking = booking => {
    const onBookingSuccess = async () => await fetchBookings()
    const onRequestCancellation = async () => await fetchBookings()
    openModal(<BookingDetails 
      booking={booking} 
      onBookingSuccess={onBookingSuccess} 
      onRequestCancellation={onRequestCancellation} />)
  }

  const generateItinerary = () => {
    const data = filteredBookings.map(booking => ({
      date: booking.startDate,
      time: booking.startTime || booking.bookableDetails.checkInTime,
      booking: `${booking.bookableDetails?.name}${booking.roomTypeDetails ? `, ${booking.roomTypeDetails.name}` : ''}`,
      status: booking.status,
    }))
    
    openModal(<Report 
      title='Travel Itinerary'
      startDate={formatDate(dates[0]) || ''}
      endDate={formatDate(dates[dates.length-1]) || ''}
      data={data} 
    />)
  }

  return (
    <div className='traveler-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Your Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <div className='content col'>
          <select onChange={e=>setFilter(e.target.value)}>
            <option value='all'>All</option>
            <option selected value='confirmed'>Confirmed</option>
            <option value='completed'>Completed</option>
            <option value='pendingCancellation'>Pending Cancellation</option>
          </select>
          <Button text='Generate Itinerary' onClick={generateItinerary} />
          {dates.map(date => {
            const bookings = getBookingsForDate(date)
            return (
              <div className='date-grouping col' key={date}>
                <h2>{formatDate(date)}</h2>
                <div className='bookings-list col'>
                  {bookings.map(booking => <BookingCell key={booking.id} booking={booking} onView={onViewBooking} />)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const BookingCell = ({ booking, onView }) => {
  let name = booking.bookableDetails?.name
  if (booking.roomTypeDetails) name += `, ${booking.roomTypeDetails.name}`

  return (
    <div className='booking-cell row'>
      <div>
        <p>{name}</p>
        <p className='subtitle'>{booking.startTime || booking.bookableDetails.checkInTime}</p>
      </div>
      <div className='row'>
        {booking.status != 'confirmed' && <p className='subtitle'>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p>}
        <Button backgroundless small icon={<InfoIcon onClick={()=>onView(booking)} />} />
      </div>
    </div>
  )
}