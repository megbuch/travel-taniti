import { toast } from 'react-toastify'
import { deleteAccommodation } from '../../api';
import { useModal } from '../../hooks';
import { Button, AccommodationEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './styles.scss'

export default function AccommodationDetails({ accommodation, onSave, onDelete }) {
  const { openModal, closeModal } = useModal() 
  
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteAccommodation(accommodation.id)
      onDelete(accommodation)
      closeModal()
    } catch (error) {
      console.log('Could not delete accommodation: ', error)
      toast.error('Could not delete accommodation')
    }
  }

  return (
    <div className='accommodation-details-comp col details'>
      {accommodation.imageURL && <img src={accommodation.imageURL} />}
      <div className='content'>
        <div>
          <h1>{accommodation.name}</h1>
          <p>{accommodation.rating ? renderStars(accommodation.rating) : 'Not enough ratings'}</p>
        </div>

        <div className='actions row'>
          <Button short small text='Edit' onClick={()=>openModal(<AccommodationEdit accommodation={accommodation} onSave={onSave} onDelete={onDelete} />)} />
          <Button short small text='Delete' onClick={handleDelete} />
        </div>

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

        {accommodation.roomTypes && 
          <div className='section'>
            <p className='subtitle'>Room Types</p>
            {accommodation.roomTypes?.map(rt => <p>{rt.name}</p>)}
          </div>
        }

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
      </div>
    </div>
  )
}