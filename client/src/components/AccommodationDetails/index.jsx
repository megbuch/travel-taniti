import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAccommodation } from '../../api';
import { useModal } from '../../hooks';
import { Button, AccommodationEdit, RoomTypeDetails, RoomTypeEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './styles.scss'

export default function AccommodationDetails({ accommodation, onSave, onDelete, onRefresh }) {
  const { openModal, closeModal } = useModal() 
  const [showRoomTypeForm, setShowRoomTypeForm] = useState(false)

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

  return (
    <div className='accommodation-details-comp col details'>
      {accommodation.imageURL && <img src={accommodation.imageURL} />}
      <div className='content'>
        <div>
          <h1>{accommodation.name}</h1>
          <p>{accommodation.rating ? renderStars(accommodation.rating) : 'Not enough ratings'}</p>
        </div>

        <div className='actions row'>
          <Button short small text='Edit' onClick={()=>openModal(<AccommodationEdit accommodation={accommodation} onSave={onSave} onDelete={onDelete} onRefresh={onRefresh} />)} />
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
        <div className='row'>
          <h3>Room Types</h3>
          {!showRoomTypeForm && <Button small short backgroundless icon={<AddCircleOutlineIcon />} onClick={()=>setShowRoomTypeForm(true)} />}
        </div>
        {showRoomTypeForm && <RoomTypeEdit accommodation={accommodation} onSave={saveRoomType} onCancel={()=>setShowRoomTypeForm(false)} />}
        <div className='section'>
          {accommodation.roomTypes?.map(rt => <RoomTypeDetails key={rt.id} roomType={rt} onDelete={onRefresh} />)}
        </div>
        <h3>Contact</h3>
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