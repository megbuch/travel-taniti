import { toast } from 'react-toastify'
import { useModal, useSession } from '../../hooks'
import { Button, AccommodationDetails, RestaurantDetails, ActivityDetails } from '..'
import { updateBooking, deleteBooking } from '../../api'

export default function BookingDetails({ booking, onBookingSuccess, onRequestCancellation, onDelete }) {
  const { openModal, closeModal } = useModal()
  const { me } = useSession()
  const hasDateRange = booking?.startDate && booking?.endDate && (booking.startDate !== booking.endDate)

  const onViewService = () => {
    console.log(booking)
    switch (booking.bookingType) {
      case 'accommodation': openModal(<AccommodationDetails accommodation={booking.bookableDetails} onBookingSuccess={onBookingSuccess} />); break
      case 'restaurant': openModal(<RestaurantDetails restaurant={booking.bookableDetails} onBookingSuccess={onBookingSuccess} />); break
      case 'activity': openModal(<ActivityDetails activity={booking.bookableDetails} onBookingSuccess={onBookingSuccess} />); break
    }
  }

  const calculateNumberOfNights = () => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  const calculateTotalCost = () => {
    if (booking.bookingType === 'accommodation') {
      return booking.roomTypeDetails.pricePerNight * calculateNumberOfNights()
    }
    if (booking.bookingType === 'activity') {
      return booking.bookableDetails.pricePerPerson * booking.quantity
    }
  }

  const requestCancellation = async () => {
    try {
      const bookingData = {
        status: 'pendingCancellation',
      }
      await updateBooking(booking.id, bookingData)
      onRequestCancellation()
      toast.success('Cancellation requested')
      closeModal()
    } catch (error) {
      console.log('Could not update booking: ', error)
      toast.error('Could not request cancellation')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteBooking(booking.id)
      onDelete()
      toast.success('Booking deleted')
      closeModal()
    } catch (error) {
      console.log('Could not delete booking: ', error)
      toast.error('Could not delete booking')
    }
  }

  return (
    <div className='booking-details-comp details'>
      <h1>{booking.bookableDetails.name}</h1>
      <div className='section'>
        <p className='subtitle'>Guests</p>
        <p>{booking.quantity}</p>
      </div>

      {hasDateRange ? 
          <div className='section'>
            <p className='subtitle'>Dates</p>
            <p>{`${booking.startDate} - ${booking.endDate}`}</p>
          </div>
        : 
          <div className='section'>
            <p className='subtitle'>Date</p>
            <p>{booking.startDate}</p>
          </div>
      }
      
      {booking?.startTime && 
        <div className='section'>
          <p className='subtitle'>Start Time</p>
          <p>{booking.startTime}</p>
        </div>
      }

      {booking?.endTime && 
        <div className='section'>
          <p className='subtitle'>End Time</p>
          <p>{booking.endTime}</p>
        </div>
      }

      {booking.bookingType == 'accommodation' && booking.roomTypeDetails && 
        <>
          <div className='section'>
            <p className='subtitle'>Check In</p>
            <p>{booking.bookableDetails.checkInTime}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Check Out</p>
            <p>{booking.bookableDetails.checkOutTime}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Room</p>
            <p>{booking.roomTypeDetails.name}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Price Per Night</p>
            <p>{`$${booking.roomTypeDetails.pricePerNight}`}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Nights</p>
            <p>{calculateNumberOfNights()}</p>
          </div>
        </>
      }

      {booking.bookingType === 'activity' &&
        <div className='section'>
          <p className='subtitle'>Price Per Person</p>
          <p>{`$${booking.bookableDetails.pricePerPerson}`}</p>
        </div>
      }

      {['accommodation', 'activity'].includes(booking.bookingType) &&
        <div className='section'>
          <p className='subtitle'>Total Cost</p>
          <p>{`$${calculateTotalCost()?.toFixed(2)}`}</p>
        </div>
      }

      {me?.role == 'admin' && booking.userDetails && 
        <>
          <div className='section'>
            <p className='subtitle'>Name</p>
            <p>{`${booking.userDetails.firstName} ${booking.userDetails.lastName}`}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Email</p>
            <p>{booking.userDetails.email}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Status</p>
            <p className='capitalize'>{booking.status}</p>
          </div>
        </>
      }

      <div className='section'>
        <Button text='View Service' onClick={onViewService} />
        {me?.role === 'traveler' && booking.status === 'confirmed' && <Button text='Request Cancellation' onClick={requestCancellation} />}
        {me?.role === 'admin' && <Button text='Delete' onClick={handleDelete} />}
      </div>
    </div>
  )
}