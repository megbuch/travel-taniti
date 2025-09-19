import { useModal } from '../../hooks'
import { Button, AccommodationDetails, RestaurantDetails, ActivityDetails } from '..'

export default function BookingDetails({ booking }) {
  const { openModal } = useModal()

  // todo: fix bug - the date showing in the booking details is different than is displayed in the booking list

  const onViewService = () => {
    console.log(booking)
    switch (booking.bookingType) {
      case 'accommodation': openModal(<AccommodationDetails accommodation={booking.bookableDetails} />); break
      case 'restaurant': openModal(<RestaurantDetails restaurant={booking.bookableDetails} />); break
      case 'activity': openModal(<ActivityDetails activity={booking.bookableDetails} />); break
    }
  }

  const calculateNumberOfNights = () => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  const calculateTotalCost = () => {
    if (booking.bookingType === 'accommodation') {
      const pricePerNight = booking.roomTypeDetails.pricePerNight
      if (!pricePerNight || !booking.endDate || !booking.startDate) return null
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      return pricePerNight * nights
    }
    const pricePerPerson = booking.bookableDetails?.pricePerPerson
    const guests = booking.numberOfGuests || 1
    return pricePerPerson ? pricePerPerson * guests : null
  }

  return (
    <div className='booking-details-comp details'>
      <h1>{booking.bookableDetails.name}</h1>
      <div className='section'>
        <p className='subtitle'>Guests</p>
        <p>{booking.quantity}</p>
      </div>

      {booking.startDate === booking.endDate 
        ?
          <div className='section'>
            <p className='subtitle'>Date</p>
            <p>{booking.startDate}</p>
          </div>
        :
        <>
          <div className='section'>
            <p className='subtitle'>Start Date</p>
            <p>{booking.startDate}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>End Date</p>
            <p>{booking.endDate}</p>
          </div>
        </>
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
          <p className='subtitle'>{`Total Cost (${booking.quantity} ${booking.quantity == 1 ? 'Guest' : 'Guests'})`}</p>
          <p>{`$${calculateTotalCost()?.toFixed(2)}`}</p>
        </div>
      }
      
      <Button text={`View ${booking.bookingType}`} onClick={onViewService} />
    </div>
  )
}