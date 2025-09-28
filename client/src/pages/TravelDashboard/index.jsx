import { useEffect, useState } from 'react'
import { getBookings } from '../../api'
import { Navigation, Button, BookingDetails, Report } from '../../components'
import { useModal, useSession } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import './styles.scss'

export default function TravelDashboard() {
  const { openModal } = useModal()
  const { me } = useSession()
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
    <div className='travel-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <div className='section'>
          <h1>Travel Dashboard</h1>
          <p className='emphasized-small'>{`Welcome, ${me?.firstName} ${me?.lastName}.`}</p>
        </div>
        <p>
          Browse availability and make reservations for restaurants, hotels, and activities throughout our booking platform. 
          Return here to manage all of your bookings in one place and generate your travel itinerary.
        </p>
        <div className='content'>
          <div className='filter row'>
            <select value={filter} onChange={e=>setFilter(e.target.value)}>
              <option value='all'>All</option>
              <option value='confirmed'>Confirmed</option>
              <option value='completed'>Completed</option>
              <option value='pendingCancellation'>Pending Cancellation</option>
            </select>
            <Button small short text='Generate Itinerary' onClick={generateItinerary} />
          </div>
          {dates.map(date => {
            const bookings = getBookingsForDate(date)
            return (
              <div className='section col' key={date}>
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

  const getStatus = () => {
    if (booking.status === 'pendingCancellation') return 'Pending Cancellation'
    if (booking.status === 'completed') return 'Completed'
    return 'Confirmed'
  }

  return (
    <div className='booking-cell row'>
      <div>
        <p>{name}</p>
        <p className='subtitle'>{booking.startTime || booking.bookableDetails.checkInTime}</p>
      </div>
      <div className='row'>
        {booking.status && <p className='status'>{getStatus()}</p>}
        <Button backgroundless small icon={<InfoIcon onClick={()=>onView(booking)} />} />
      </div>
    </div>
  )
}
