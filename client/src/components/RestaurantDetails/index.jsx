import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { deleteRestaurant, getRestaurantAvailability } from '../../api';
import { useModal, useSession } from '../../hooks';
import { Button, RestaurantEdit, SignInForm, BookingEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './styles.scss'

export default function RestaurantDetails({ restaurant, onSave, onDelete, onBookingSuccess }) {
  const { openModal, closeModal } = useModal() 
  const { me } = useSession()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [availableSlots, setAvailableSlots] = useState()
  
  useEffect(() => {
    const getAvailability = async () => {
      const response = await getRestaurantAvailability(restaurant.id, { date: date })
      setAvailableSlots(response?.availableSlots)
    }
    getAvailability()
  }, [date])

  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteRestaurant(restaurant.id)
      toast.success('Deleted restaurant')
      onDelete(restaurant)
      closeModal()
    } catch (error) {
      console.log('Could not delete restaurant: ', error)
      toast.error('Could not delete restaurant')
    }
  }

  const createBooking = option => {
    openModal(<BookingEdit 
      service={restaurant} 
      startDate={date} 
      endDate={date} 
      option={option}
      onBookingSuccess={onBookingSuccess}
      onBack={()=>openModal(<RestaurantDetails restaurant={restaurant} onSave={onSave} onDelete={onDelete} onBookingSuccess={onBookingSuccess} />)} />)
  }

  return (
    <div className='restaurant-details-comp details'>
      {restaurant.imageURL && <img src={restaurant.imageURL} />}
      <div className='content'>
        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.rating ? renderStars(restaurant.rating) : 'Not enough ratings'}</p>
          <p>{restaurant.priceRange}</p>
        </div>
        {me?.role === 'admin' && 
          <div className='actions row'>
            <Button short small backgroundless icon={<EditSquareIcon />} text='Edit' onClick={()=>openModal(<RestaurantEdit restaurant={restaurant} onSave={onSave} onDelete={onDelete} />)} />
            <Button short small backgroundless icon={<DeleteForeverIcon />} text='Delete' onClick={handleDelete} />
          </div>
        }
        <p>{restaurant.description}</p>
        {restaurant.cuisineType &&
          <div className='section'>
            <p className='subtitle'>Cuisine</p>
            <p>{restaurant.cuisineType}</p>
          </div>
        }
        <div className='section'>
          <p className='subtitle'>Hours</p>
          <p>{`${restaurant.openTime} - ${restaurant.closeTime}`}</p>
          <p>{restaurant.operatingDays.join(', ')}</p>
        </div>
        {me?.role === 'admin' && 
          <div className='section'>
            <p className='subtitle'>Max Capacity</p>
            <p>{restaurant.maxCapacity}</p>
          </div>
        }
        <h4>Contact</h4>
        <div className='section'>
          <p className='subtitle'>Location</p>
          <p>{restaurant.location}</p>
        </div>
        {restaurant.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Email</p>
            <p>{restaurant.contactEmail}</p>
          </div>
        }
        {restaurant.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Phone</p>
            <p>{restaurant.contactPhone}</p>
          </div>
        }    
        <div className='divider'></div>
        <h3>Check Availability</h3>
        <input type='date' value={date} onChange={e=>setDate(e.target.value)} />
        {availableSlots?.length > 0 ? 
          <ul className='availability-list col'>
            {availableSlots.map((slot, index) => (
              <li key={index} className='availability-list-item row'>
                <div>
                  <p>{slot.time}</p>
                  <p className='subtitle'>{`${slot.available} Available`}</p>
                </div>
                {me && <Button small short text='Book now' onClick={()=>createBooking(slot)} />}
              </li>
            ))}
          </ul>
          :
          <p className='subtitle'>No available time slots on this date.</p>
        }
        {!me && <Button small short text='Sign in to book' onClick={()=>openModal(<SignInForm redirectAfterLogin={false} />)} />}
      </div>
      {me?.role === 'admin' && <p className='subtitle'>{`Created ${new Date(restaurant.createdAt).toLocaleDateString()}`}</p>}
    </div>
  )
}