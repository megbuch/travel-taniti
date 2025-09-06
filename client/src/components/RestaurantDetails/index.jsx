import { toast } from 'react-toastify'
import { deleteRestaurant } from '../../api';
import { useModal } from '../../hooks';
import { Button, RestaurantEdit } from '..'
import StarIcon from '@mui/icons-material/Star';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './styles.scss'

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
    <div className='restaurant-details-comp col details'>
      {restaurant.imageURL && <img src={restaurant.imageURL} />}
      <div className='content'>
        <div>
          <h1>{restaurant.name}</h1>
          <p>{renderStars(restaurant.rating)}</p>
          <p>{restaurant.priceRange}</p>
        </div>

        <div className='actions row'>
          <Button short small backgroundless icon={<EditSquareIcon />} text='Edit' onClick={()=>openModal(<RestaurantEdit restaurant={restaurant} onSave={onSave} onDelete={onDelete} />)} />
          <Button short small backgroundless icon={<DeleteForeverIcon />} text='Delete' onClick={handleDelete} />
        </div>

        <p className='emphasized-small'>{restaurant.description}</p>

        {restaurant.cuisineType &&
          <div className='col section'>
            <p className='subtitle'>Cuisine</p>
            <p>{restaurant.cuisineType}</p>
          </div>
        }

        <div className='col section'>
          <p className='subtitle'>Max Capacity</p>
          <p>{restaurant.maxCapacity}</p>
        </div>

        <div className='col section'>
          <p className='subtitle'>Hours</p>
          <p>{`${restaurant.openTime} - ${restaurant.closeTime}`}</p>
          {restaurant.operatingDays.map(d => <p>{d}</p>)}
        </div>
        
        {(restaurant.contactPhone || restaurant.contactEmail) && 
          <div className='col section'>
            <p className='subtitle'>Contact</p>
            {restaurant.contactEmail && <p>{restaurant.contactEmail}</p>}
            {restaurant.contactPhone && <p>{restaurant.contactPhone}</p>}
          </div>
        }
      </div>
    </div>
  )
}