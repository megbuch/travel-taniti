import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { deleteAccommodation, getAccommodationAvailability } from '../../api';
import { useModal, useSession } from '../../hooks';
import { Button, AccommodationEdit, RoomTypeDetails, RoomTypeEdit, SignInForm, BookingEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './styles.scss'

export default function AccommodationDetails({ accommodation, onSave, onDelete, onRefresh, onBookingSuccess }) {
  const { openModal, closeModal } = useModal() 
  const { me } = useSession()
  const [showRoomTypeForm, setShowRoomTypeForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  })  
  const [availableRooms, setAvailableRooms] = useState()

  useEffect(() => {
    if (!startDate || !endDate) return
    const getAvailability = async () => {
      try {
        const response = await getAccommodationAvailability(accommodation.id, { startDate, endDate })
        setAvailableRooms(response?.availableRoomTypes)
      } catch (error) {
        console.log(error)
        setAvailableRooms([]) // Clear rooms
      }
    }
    getAvailability()
  }, [startDate, endDate])

  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteAccommodation(accommodation.id)
      toast.success('Deleted accommodation')
      onDelete(accommodation)
      closeModal()
    } catch (error) {
      console.log('Could not delete accommodation: ', error)
      toast.error('Could not delete accommodation')
    }
  }

  const saveRoomType = () => {
    onRefresh()
    setShowRoomTypeForm(false)
  }
  
  const createBooking = option => {
    openModal(<BookingEdit 
      service={accommodation} 
      startDate={startDate} 
      endDate={endDate} 
      option={option}
      onBookingSuccess={onBookingSuccess}
      onBack={()=>openModal(<AccommodationDetails accommodation={accommodation} onSave={onSave} onDelete={onDelete} onRefresh={onRefresh} onBookingSuccess={onBookingSuccess} />)} />)
  }
  
  return (
    <div className='accommodation-details-comp col details'>
      {accommodation.imageURL && <img src={accommodation.imageURL} />}
      <div className='content'>
        <div>
          <h1>{accommodation.name}</h1>
          <p>{accommodation.rating ? renderStars(accommodation.rating) : 'Not enough ratings'}</p>
        </div>
        {me?.role === 'admin' && 
          <div className='actions row'>
            <Button short small text='Edit' onClick={()=>openModal(<AccommodationEdit accommodation={accommodation} onSave={onSave} onDelete={onDelete} onRefresh={onRefresh} />)} />
            <Button short small text='Delete' onClick={handleDelete} />
          </div>
        }
        <p>{accommodation.description}</p>
        {accommodation.checkInTime && 
          <div className='section'>
            <p className='subtitle'>Check In</p>
            <p>{accommodation.checkInTime}</p>
          </div>
        }
        {accommodation.checkOutTime && 
          <div className='section'>
            <p className='subtitle'>Check Out</p>
            <p>{accommodation.checkOutTime}</p>
          </div>
        }
        {accommodation.amenities?.length > 0 && 
          <div className='section'>
            <p className='subtitle'>Amenities</p>
            {accommodation.amenities.join(', ')}
          </div>
        }
        <div className='row'>
          <h4>Room Types</h4>
          {me?.role === 'admin' && !showRoomTypeForm && <Button small short backgroundless icon={<AddCircleOutlineIcon />} onClick={()=>setShowRoomTypeForm(true)} />}
        </div>
        {me?.role === 'admin' && showRoomTypeForm && <RoomTypeEdit accommodation={accommodation} onSave={saveRoomType} onCancel={()=>setShowRoomTypeForm(false)} />}
        <div className='section'>
          {accommodation.roomTypes?.map(rt => <RoomTypeDetails key={rt.id} roomType={rt} onDelete={onRefresh} />)}
        </div>
        <h4>Contact</h4>
        <div className='section'>
          <p className='subtitle'>Location</p>
          <p>{accommodation.location}</p>
        </div>
        {accommodation.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Email</p>
            <p>{accommodation.contactEmail}</p>
          </div>
        }
        {accommodation.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Phone</p>
            <p>{accommodation.contactPhone}</p>
          </div>
        }
        <div className='divider'></div>
        <h3>Check Availability</h3>
        <div className='row'>
          <input type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} />
          <input type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} />
        </div>
        {availableRooms?.length > 0 ? 
          <ul className='availability-list col'>
            {availableRooms.map(room => (
              <li className='availability-list-item row'>
                <div>
                  <p>{room.roomType.name}</p>
                  <p className='subtitle'>{`$${room.roomType.pricePerNight} per night`}</p>
                  <p className='subtitle'>{`Sleeps ${room.roomType.maxGuests}`}</p>
                  <p className='subtitle'>{`${room.available} Available`}</p>
                </div>
                {me && <Button small short text='Book now' onClick={()=>createBooking(room)} />}
              </li>
            ))}
          </ul>
          :
          <p className='subtitle'>No available rooms for this date range.</p>
        }
        {!me && <Button small short text='Sign in to book' onClick={()=>openModal(<SignInForm redirectAfterLogin={false} />)} />}
      </div>
      {me?.role == 'admin' && <p className='subtitle'>{`Created ${new Date(accommodation.createdAt).toLocaleDateString()}`}</p>}
    </div>
  )
}