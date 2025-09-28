import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSession, useModal } from '../../hooks'
import { createBooking } from '../../api'
import { Button } from '..'
export default function BookingEdit(props) {
  const { 
    booking, 
    service, 
    startDate, 
    endDate, 
    option,
    onBookingSuccess,
    onBack
  } = props
  const navigate = useNavigate()
  const { me } = useSession()
  const { closeModal } = useModal()
  const [bookingComplete, setBookingComplete] = useState(false)
  const [guestCount, setGuestCount] = useState(1)
  const hasDateRange = startDate !== endDate
  const isAccommodation = !!service.checkInTime && !!service.checkOutTime && !!option?.roomType
  const isActivity = !!service.maxParticipants && !!option.time
  const isRestaurant = !!service.maxCapacity && !!option.time
  
  const calculateNumberOfNights = () => {
    const start = new Date(booking?.startDate || startDate)
    const end = new Date(booking?.endDate || endDate)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  const calculateTotalCost = () => {
    if (isAccommodation) return option.roomType.pricePerNight * calculateNumberOfNights()
    if (isActivity) return service.pricePerPerson * guestCount
    return 0
  }
  const totalCost = calculateTotalCost()?.toFixed(2)

  const save = async (e) => {    
    e.preventDefault()
    try {
      const bookingData = {
        bookingType: getServiceTypeString().toLowerCase(),
        bookableID: service.id,
        roomTypeID: isAccommodation ? option.roomType.id : null,
        quantity: guestCount,
        startDate: startDate,
        endDate: endDate,
        startTime: (isActivity || isRestaurant) ? option.time : null
      }
      await createBooking(bookingData)
      toast.success(`Successfully booked ${getServiceTypeString().toLowerCase()}: ${service.name}`)
      setBookingComplete(true)
      onBookingSuccess?.()
    } catch (error) {
      console.log('Could not create booking: ', error)
      toast.error('Could not create booking')
    }
  }

  const getServiceTypeString = () => {
    if (isAccommodation) return 'Accommodation'
    if (isActivity) return 'Activity'
    if (isRestaurant) return 'Restaurant'
  }

  const goToDashboard = () => {
    navigate('/travel-dashboard')
    closeModal()
  }

  if (!me) return <></>
  if (bookingComplete) {
    return (
      <div className='col details'>
        <h1>{`${booking ? 'Edit': 'Create'} Booking`}</h1>
        <p>{`Your ${getServiceTypeString().toLowerCase()} has been booked!`}</p>
        {window.location.pathname !== '/travel-dashboard' && <Button text='Go to Dashboard' onClick={goToDashboard} />}
      </div>
    )
  }
  return (
    <form onSubmit={save} className='col'>
      <h1>{`${booking ? 'Edit': 'Create'} Booking`}</h1>
      <div className='section'>
        <p className='subtitle'>{`${getServiceTypeString()} Name`}</p>
        <p>{service.name}</p>
      </div>
      {hasDateRange ? 
          <div className='section'>
            <p className='subtitle'>Dates</p>
            <p>{`${startDate} - ${endDate}`}</p>
          </div>
        : 
          <div className='section'>
            <p className='subtitle'>Date</p>
            <p>{startDate}</p>
          </div>
      }
      {isAccommodation && 
        <>
          <div className='section'>
            <p className='subtitle'>Room Type</p>
            <p>{option.roomType.name}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Nights</p>
            <p>{calculateNumberOfNights()}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Price Per Night</p>
            <p>{`$${option.roomType.pricePerNight}`}</p>
          </div>
        </>
      }
      {(isActivity || isRestaurant) && 
        <div className='section'>
          <p className='subtitle'>Time</p>
          <p>{option.time}</p>
        </div>
      }
      <div className='section'>
        <p className='subtitle'>Number of Guests</p>
        <input 
          required 
          type='number' 
          min={1} 
          max={isAccommodation ? option.roomType.maxGuests : option.available} 
          defaultValue={1} 
          onChange={e=>setGuestCount(e.target.value)} 
        />
      </div>
      {totalCost > 0 && 
        <div className='section'>
          <p className='subtitle'>Total Cost</p>
          <p>{`$${totalCost}`}</p>
        </div>
      }
      <div className='row'>
        <Button type='button' inverted border onClick={onBack} text='Back' />
        <Button type='submit' text='Book Now' />
      </div>
    </form>
  )
}