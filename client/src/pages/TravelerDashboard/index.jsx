import { useEffect, useState } from 'react'
import { getBookings } from '../../api/bookings'
import { Navigation, Button, BookingDetails } from '../../components'
import { useModal } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import './styles.scss'

export default function TravelerDashboard() {
  const { openModal } = useModal()
  const [bookings, setBookings] = useState([])

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    const response = await getBookings()
    const sortedBookings = response?.bookings?.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate)
    })
    setBookings(sortedBookings)
  }

  const dates = []
  bookings.forEach(booking => {
    if (!dates.includes(booking.startDate)) {
      dates.push(booking.startDate)
    }
  })

  const getBookingsForDate = date => {
    const bookingsForDate = bookings.filter(booking => booking.startDate === date)
    bookingsForDate.sort((a, b) => {
      const timeA = a.startTime || a.bookableDetails.checkInTime || '00:00'
      const timeB = b.startTime || b.bookableDetails.checkInTime || '00:00'
      return timeA.localeCompare(timeB)
    })
    return bookingsForDate
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const onViewBooking = booking => {
    openModal(<BookingDetails booking={booking} />)
  }

  return (
    <div className='traveler-dashboard-page col'>
      <Navigation />
      <div className='page-container'>
        <h1>Your Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, earum nesciunt. Adipisci dolorum, quas voluptate laboriosam doloribus, delectus rerum excepturi non modi et fugit sequi! Veniam eius eos consectetur quod.</p>
        <div className='content col'>
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
      <Button backgroundless small icon={<InfoIcon onClick={()=>onView(booking)} />} />
    </div>
  )
}