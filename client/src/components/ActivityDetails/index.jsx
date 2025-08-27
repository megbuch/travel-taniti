import { toast } from 'react-toastify'
import { deleteActivity } from '../../api';
import { useModal } from '../../hooks';
import { Button, ActivityEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ActivityDetails({ activity, onSave, onDelete }) {
  const { openModal, closeModal } = useModal() 
  
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteActivity(activity.id)
      onDelete(activity)
      closeModal()
    } catch (error) {
      console.log('Could not delete activity: ', error)
      toast.error('Could not delete activity')
    }
  }

  return (
    <div className='activity-details-comp col'>
      <img src={activity.imageURL} />
      <div className='row'>
        <div>
          <h1>{activity.name}</h1>
          <p>{renderStars(activity.rating)}</p>
        </div>
        <Button backgroundless icon={<EditSquareIcon />} onClick={()=>openModal(<ActivityEdit activity={activity} onSave={onSave} onDelete={onDelete} />)} />
        <Button backgroundless icon={<DeleteForeverIcon />} onClick={handleDelete} />
      </div>

      <h4>About this activity</h4>
      <p>{activity.description}</p>

      <h4>Location</h4>
      {activity.location && <p className='subtitle'>{activity.location}</p>}
      <h4>Contact</h4>
      {activity.contactEmail && 
        <div className='row section'>
          <p className='subtitle'>Contact Email</p>
          <p>{activity.contactEmail}</p>
        </div>
      }
      {activity.contactPhone && 
        <div className='row section'>
          <p className='subtitle'>Contact Phone</p>
          <p>{activity.contactPhone}</p>
        </div>
      }
    </div>
  )
}