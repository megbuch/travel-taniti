import { toast } from 'react-toastify'
import { deleteRestaurant } from '../../api';
import { useModal } from '../../hooks';
import { Button, RestaurantEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function RestaurantDetails({ restaurant, onSave, onDelete }) {
  const { openModal, closeModal } = useModal() 
  
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  const handleDelete = async () => {
    try {
      await deleteRestaurant(restaurant.id)
      onDelete(restaurant)
      closeModal()
    } catch (error) {
      console.log('Could not delete restaurant: ', error)
      toast.error('Could not delete restaurant')
    }
  }

  return (
    <div className='restaurant-details-comp col'>
      <img src={restaurant.imageURL} />
      <div className='row'>
        <div>
          <h1>{restaurant.name}</h1>
          <p>{renderStars(restaurant.rating)}</p>
        </div>
        <Button backgroundless icon={<EditSquareIcon />} onClick={()=>openModal(<RestaurantEdit restaurant={restaurant} onSave={onSave} onDelete={onDelete} />)} />
        <Button backgroundless icon={<DeleteForeverIcon />} onClick={handleDelete} />
      </div>

      <h4>About this restaurant</h4>
      <p>{restaurant.description}</p>
      {restaurant.amenities?.map(a => <p>{a}</p>)}

      <h4>Location</h4>
      {restaurant.location && <p className='subtitle'>{restaurant.location}</p>}

      <h4>Contact</h4>
      {restaurant.contactEmail && 
        <div className='row section'>
          <p className='subtitle'>Contact Email</p>
          <p>{restaurant.contactEmail}</p>
        </div>
      }
      {restaurant.contactPhone && 
        <div className='row section'>
          <p className='subtitle'>Contact Phone</p>
          <p>{restaurant.contactPhone}</p>
        </div>
      }
    </div>
  )
}