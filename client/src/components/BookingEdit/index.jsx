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
    onBack
  } = props
  const navigate = useNavigate()
  const { me } = useSession()
  const { closeModal } = useModal()
  const [bookingComplete, setBookingComplete] = useState(false)
  const hasDateRange = startDate !== endDate
  const isAccommodation = !!service.checkInTime && !!service.checkOutTime && !!option?.roomType
  const isActivity = !!service.maxParticipants && !!option.time
  const isRestaurant = !!service.maxCapacity && !!option.time

  const save = async (e) => {
    // todo: 
    // 1. allow quantity input
    // 2. validate that the quantity does not exceed what is available
    // 3. back end should show no available slots for historical dates
    
    e.preventDefault()
    try {
      const bookingData = {
        bookingType: getServiceTypeString().toLowerCase(),
        bookableID: service.id,
        roomTypeID: isAccommodation ? option.roomType.id : null,
        quantity: 1,
        startDate: startDate,
        endDate: endDate,
        startTime: (isActivity || isRestaurant) ? option.time : null
      }
      const response = await createBooking(bookingData)
      console.log(response)
      toast.success(`Successfully booked ${getServiceTypeString().toLowerCase()}: ${service.name}`)
      setBookingComplete(true)
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
    navigate('/traveler-dashboard')
    closeModal()
  }

  if (!me) return <></>
  if (bookingComplete) {
    return (
      <div className='col details'>
        <h1>{`${booking ? 'Edit': 'Create'} Booking`}</h1>
        <p>{`Your ${getServiceTypeString().toLowerCase()} has been booked!`}</p>
        <Button text='Go to Dashboard' onClick={goToDashboard} />
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
            <p className='subtitle'>Date Range</p>
            <p>{`${startDate} - ${endDate}`}</p>
          </div>
        : 
          <div className='section'>
            <p className='subtitle'>Date</p>
            <p>{startDate}</p>
          </div>
      }
      {(isActivity || isRestaurant) && 
        <div className='section'>
          <p className='subtitle'>Time</p>
          <p>{option.time}</p>
        </div>
      }
      {isAccommodation && 
        <>
          <div className='section'>
            <p className='subtitle'>Room Type</p>
            <p>{option.roomType.name}</p>
          </div>
          <div className='section'>
            <p className='subtitle'>Price Per Night</p>
            <p>{`$${option.roomType.pricePerNight}`}</p>
          </div>
        </>
      }
      <div className='row'>
        <Button type='button' inverted border onClick={onBack} text='Back' />
        <Button type='submit' text='Book Now' />
      </div>
    </form>
  )
}