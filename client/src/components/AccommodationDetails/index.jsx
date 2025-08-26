import { toast } from 'react-toastify'
import { deleteAccommodation } from '../../api';
import { useModal } from '../../hooks';
import { Button, AccommodationEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    <div className='accommodation-details-comp col'>
      <img src={accommodation.imageURL} />
      <div className='row'>
        <div>
          <h1>{accommodation.name}</h1>
          <p>{renderStars(accommodation.rating)}</p>
        </div>
        <Button backgroundless icon={<EditSquareIcon />} onClick={()=>openModal(<AccommodationEdit accommodation={accommodation} onSave={onSave} onDelete={onDelete} />)} />
        <Button backgroundless icon={<DeleteForeverIcon />} onClick={handleDelete} />
      </div>

      <h4>About this accommodation</h4>
      <p>{accommodation.description}</p>
      {accommodation.amenities?.map(a => <p>{a}</p>)}

      <h4>Location</h4>
      {accommodation.location && <p className='subtitle'>{accommodation.location}</p>}
      <h4>Contact</h4>
      {accommodation.contactEmail && 
        <div className='row section'>
          <p className='subtitle'>Contact Email</p>
          <p>{accommodation.contactEmail}</p>
        </div>
      }
      {accommodation.contactPhone && 
        <div className='row section'>
          <p className='subtitle'>Contact Phone</p>
          <p>{accommodation.contactPhone}</p>
        </div>
      }
      {accommodation.checkInTime && 
        <div className='row section'>
          <p className='subtitle'>Check In</p>
          <p>{accommodation.checkInTime}</p>
        </div>
      }
      {accommodation.checkOutTime && 
        <div className='row section'>
          <p className='subtitle'>Check Out</p>
          <p>{accommodation.checkOutTime}</p>
        </div>
      }
      {accommodation.amenities?.map(a => <p>{a}</p>)}

      {accommodation.roomTypes && 
        <>
          <h4>Room Details</h4>
          {accommodation.roomTypes?.map(rt => <p>{rt.name}</p>)}
        </>
      }

    </div>
  )
}