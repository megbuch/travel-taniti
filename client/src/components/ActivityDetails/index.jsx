import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { deleteActivity, getActivityAvailability } from '../../api';
import { useModal, useSession } from '../../hooks';
import { Button, ActivityEdit, SignInForm, BookingEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import './styles.scss'

export default function ActivityDetails({ activity, onSave, onDelete }) {
  const { openModal, closeModal } = useModal() 
  const { me } = useSession()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [availableSlots, setAvailableSlots] = useState()
  
  useEffect(() => {
    const getAvailability = async () => {
      const response = await getActivityAvailability(activity.id, { date: date })
      setAvailableSlots(response?.availableSlots)
    }
    getAvailability()
  }, [date])

  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteActivity(activity.id)
      toast.success('Deleted activity')
      onDelete(activity)
      closeModal()
    } catch (error) {
      console.log('Could not delete activity: ', error)
      toast.error('Could not delete activity')
    }
  }

  const createBooking = option => {
    openModal(<BookingEdit 
      service={activity} 
      startDate={date} 
      endDate={date} 
      option={option}
      onBack={()=>openModal(<ActivityDetails activity={activity} onSave={onSave} onDelete={onDelete} />)} />)
  }

  return (
    <div className='activity-details-comp details'>
      {activity.imageURL && <img src={activity.imageURL} />}
      <div className='content'>
        <div>
          <h1>{activity.name}</h1>
          <p>{activity.rating ? renderStars(activity.rating) : 'Not enough ratings'}</p>
        </div>

        {me?.role == 'admin' && 
          <div className='actions row'>
            <Button short small text='Edit' onClick={()=>openModal(<ActivityEdit activity={activity} onSave={onSave} onDelete={onDelete} />)} />
            <Button short small text='Delete' onClick={handleDelete} />
          </div>
        }

        <p>{activity.description}</p>

        <div className='section'>
          <p className='subtitle'>When</p>
          {activity.isRecurring 
            ? 
            <>
              <p>{`${new Date(activity.recurringStartDate).toLocaleDateString()} - ${new Date(activity.recurringEndDate).toLocaleDateString()}`}</p>
              <p>{`${activity.recurringTime} every ${activity.recurringDays.join(', ')}`}</p>
            </>
            : <p>{activity.oneTimeDate}</p>
          }
        </div>

        {activity.durationMinutes && 
          <div className='section'>
            <p className='subtitle'>Duration</p>
            <p>{activity.durationMinutes} Minutes</p>
          </div>
        }

        {me?.role == 'admin' && activity.maxParticipants && 
          <div className='section'>
            <p className='subtitle'>Max Participants</p>
            <p>{activity.maxParticipants}</p>
          </div>
        }

        {activity.pricePerPerson && 
          <div className='section'>
            <p className='subtitle'>Price Per Person</p>
            <p>{activity.pricePerPerson}</p>
          </div>
        }

        <h4>Contact</h4>
        <div className='section'>
          <p className='subtitle'>Location</p>
          <p>{activity.location}</p>
        </div>
        {activity.companyName && 
          <div className='section'>
            <p className='subtitle'>Company Name</p>
            <p>{activity.companyName}</p>
          </div>
        }
        {activity.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Email</p>
            <p>{activity.contactEmail}</p>
          </div>
        }
        {activity.contactEmail && 
          <div className='section'>
            <p className='subtitle'>Contact Phone</p>
            <p>{activity.contactPhone}</p>
          </div>
        }

        {me?.role !== 'admin' && 
          <>
            <div className='divider'></div>
            <h3>Check Availability</h3>
            <input type='date' value={date} onChange={e=>setDate(e.target.value)} />
            {availableSlots?.length > 0 ? 
              <ul className='availability-list col'>
                {availableSlots.map(slot => (
                  <li className='availability-list-item row'>
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
          </>
        }
      </div>
      {me?.role == 'admin' && <p className='subtitle'>{`Created ${new Date(activity.createdAt).toLocaleDateString()}`}</p>}
    </div>
  )
}