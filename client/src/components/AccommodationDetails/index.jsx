import { Button, AccommodationEdit } from '..'
import { useModal } from '../../hooks';
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';

export default function AccommodationDetails({ accommodation, onSave }) {
  const { openModal } = useModal() 
  
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  return (
    <div className='accommodation-details-comp col'>
      <img src={accommodation.imageURL} />
      <div className='row'>
        <div>
          <h1>{accommodation.name}</h1>
          <p>{renderStars(accommodation.rating)}</p>
        </div>
        <Button backgroundless icon={<EditSquareIcon />} onClick={()=>openModal(<AccommodationEdit accommodation={accommodation} onSave={onSave} />)} />
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