import { toast } from 'react-toastify'
import { deleteActivity } from '../../api';
import { useModal } from '../../hooks';
import { Button, ActivityEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './styles.scss'

export default function ActivityDetails({ activity, onSave, onDelete }) {
  const { openModal, closeModal } = useModal() 
  
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

  return (
    <div className='activity-details-comp details'>
      {activity.imageURL && <img src={activity.imageURL} />}
      <div className='content'>
        <div>
          <h1>{activity.name}</h1>
          <p>{activity.rating ? renderStars(activity.rating) : 'Not enough ratings'}</p>
        </div>

        <div className='actions row'>
          <Button short small text='Edit' onClick={()=>openModal(<ActivityEdit activity={activity} onSave={onSave} onDelete={onDelete} />)} />
          <Button short small text='Delete' onClick={handleDelete} />
        </div>

        <p>{activity.description}</p>

        <div className='section'>
          <p className='subtitle'>When</p>
          {activity.isRecurring 
            ? 
            <>
              <p>{`${activity.recurringStartDate} - ${activity.recurringEndDate}`}</p>
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

        {activity.maxParticipants && 
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
      </div>
    </div>
  )
}