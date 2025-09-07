import { useState } from 'react'
import { Button } from '..'
import { deleteRoomType } from '../../api'
import { toast } from 'react-toastify'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.scss'

export default function RoomTypeDetails({ roomType, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFullAmenities, setShowFullAmenities] = useState(false)
  const defaultAmenitiesCount = 5

  const handleDelete = async () => {
    try {
      await deleteRoomType(roomType.id)
      toast.success('Deleted room type')
      onDelete()
    } catch (error) {
      console.log('Could not delete room type: ', error)
      toast.error('Could not delete room type')
    }
  }

  return (
    <div className='room-type-details-comp details'>
      <div className='top-row'>
        <p className='emphasized-small'>{roomType.name}</p>
        <div className='row'>
          {isExpanded && <Button small short backgroundless icon={<DeleteIcon />} onClick={handleDelete} />}
          <Button 
            backgroundless 
            short
            icon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} 
            onClick={() => isExpanded ? setIsExpanded(false) : setIsExpanded(true)} />
        </div>
      </div>
      {isExpanded && 
        <div className='content'>
          <p>{`$${roomType.pricePerNight} per night`}</p>
          <div className='section'>
            <p className='subtitle'>Max Guests</p>
            <p>{roomType.maxGuests}</p>
          </div>
          <div className='row'>
            <div className='section'>
              <p className='subtitle'>Available Rooms</p>
              <p>{roomType.availableRooms}</p>
            </div>
            <div className='section'>
              <p className='subtitle'>Total Rooms</p>
              <p>{roomType.totalRooms}</p>
            </div>
          </div>
          {roomType.amenities?.length > 0 && 
            <div className='section'>
              <p className='subtitle'>Amenities</p>
              <ul>
                {showFullAmenities ? 
                  <>
                    {roomType.amenities.map((a, index) => <li key={index}>{a}</li>)}
                    {roomType.amenities.length > defaultAmenitiesCount && 
                      <li key='-1'><Button small short text='Show Less' onClick={()=>setShowFullAmenities(false)}/></li>
                    }
                  </>
                : 
                  <>
                    {roomType.amenities.slice(0, defaultAmenitiesCount).map((a, index) => <li key={index}>{a}</li>)}
                    {roomType.amenities.length > defaultAmenitiesCount && 
                      <li key='-1'><Button small short text={`Show ${roomType.amenities.length - defaultAmenitiesCount} more`} onClick={()=>setShowFullAmenities(true)}/></li>
                    }
                  </>
                }
              </ul>
            </div>
          }
        </div>
      }
    </div>
  )
}