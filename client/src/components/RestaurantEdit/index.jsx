import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createRestaurant, updateRestaurant } from '../../api'
import { RestaurantDetails, Button, ImageSearch, DaysOfWeekPicker } from '..'
import { useModal } from '../../hooks'

export default function RestaurantEdit({ restaurant, onSave, onDelete }) {
  const { openModal, closeModal } = useModal()
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [selectedDays, setSelectedDays] = useState(
    restaurant?.operatingDays || []
  )

  const nameRef = useRef()
  const descriptionRef = useRef()
  const locationRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const ratingRef = useRef()
  const maxCapacityRef = useRef()
  const openTimeRef = useRef()
  const closeTimeRef = useRef()
  const priceRangeRef = useRef()
  const cuisineTypeRef = useRef()

  const selectImage = image => {
    setSelectedImageURL(image ? image.urls.regular : '')
  }

  const toggleDay = day => {
    setSelectedDays(prev => prev.includes(day) 
      ? prev.filter(d => d !== day)
      : [...prev, day]
    )
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      const restaurantData = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        location: locationRef.current.value,
        operatingDays: selectedDays,
        openTime: openTimeRef.current.value,
        closeTime: closeTimeRef.current.value,
        maxCapacity: maxCapacityRef.current.value,
        contactEmail: contactEmailRef.current.value.trim() || null,
        contactPhone: contactPhoneRef.current.value.trim() || null,
        rating: parseInt(ratingRef.current?.value) || null,
        imageURL: selectedImageURL || restaurant?.imageURL || null,
        cuisineType: cuisineTypeRef.current?.value || null,
        priceRange: priceRangeRef.current?.value || null,
      }
      const response = restaurant 
        ? await updateRestaurant(restaurant.id, restaurantData)
        : await createRestaurant(restaurantData)
      if (restaurant) {
        onSave(response?.restaurant)
        openModal(<RestaurantDetails restaurant={response?.restaurant} onSave={onSave} onDelete={onDelete} />)
      } else {
        onSave(response?.restaurant)
        closeModal()
      }
    } catch (error) {
      console.log('Could not create restaurant: ', error)
      toast.error('Could not create restaurant')
    }
  }

  return (
    <div className='form col'>
      <h1>{`${restaurant ? 'Edit': 'Create'} Restaurant`}</h1>
      <form onSubmit={save} className='col'>
        <>
          <p className='subtitle'>Name *</p>
          <input 
            ref={nameRef}
            type='text' 
            required 
            placeholder='Salt & Stone'
            defaultValue={restaurant?.name}
          />
        </>
        <>
          <p className='subtitle'>Description *</p>
          <textarea 
            ref={descriptionRef}
            required 
            rows='3' 
            placeholder='An restaurant by the sea, offering an intimate setting.'
            defaultValue={restaurant?.description}
          />
        </>
        <>
          <p className='subtitle'>Location *</p>
          <input 
            ref={locationRef}
            type='text' 
            required 
            placeholder='100 Neptune Street'
            defaultValue={restaurant?.location}

          />
        </>
        <>
          <p className='subtitle'>Days of Operation *</p>
          <DaysOfWeekPicker 
            selectedDays={selectedDays} 
            onToggleDay={toggleDay} 
          />
        </>
        <div className='row'>
          <div className='col'>
            <p className='subtitle'>Open Time *</p>
            <input 
              required
              ref={openTimeRef}
              type='time' 
              defaultValue={restaurant?.openTime || '17:00'}
            />
          </div>
          <div className='col'>
            <p className='subtitle'>Close Time *</p>
            <input 
              required
              ref={closeTimeRef}
              type='time' 
              defaultValue={restaurant?.closeTime || '23:00'}
            />
          </div>
        </div>
        <>
          <p className='subtitle'>Max Capacity *</p>
          <input 
            ref={maxCapacityRef}
            type='number' 
            required 
            placeholder='35'
            defaultValue={restaurant?.maxCapacity}
          />
        </>
        <>
          <p className='subtitle'>Cuisine Type</p>
          <input 
            ref={cuisineTypeRef}
            type='text' 
            placeholder='Asian Fusion'
            defaultValue={restaurant?.cuisineType}
          />
        </>
        <div className='row'>
          <>
            <p className='subtitle'>Price Range</p>
            <select ref={priceRangeRef}>
              <option value='$'>$</option> 
              <option value='$$'>$$</option> 
              <option value='$$$'>$$$</option> 
            </select>
          </>
          <>
            <p className='subtitle'>Rating</p>
            <select ref={ratingRef} defaultValue={restaurant?.rating}>
              <option value='1'>★</option> 
              <option value='2'>★★</option> 
              <option value='3'>★★★</option> 
              <option value='4'>★★★★</option> 
              <option value='5'>★★★★★</option> 
            </select>
          </>
        </div>
       
        <div className='row'>
          <div className='col'>
            <p className='subtitle'>Email</p>
            <input ref={contactEmailRef} type='email' defaultValue={restaurant?.contactEmail} />
          </div>
          <div className='col'>
            <p className='subtitle'>Phone</p>
            <input ref={contactPhoneRef} type='text' defaultValue={restaurant?.contactPhone} />
          </div>
        </div>
        <>
          <p className='subtitle'>Image</p>
          <ImageSearch 
            onSelect={selectImage}
            selectedImageURL={restaurant?.imageURL}
            searchPlaceholder="Search for restaurants..."
            quickSearchTerms={['restaurant', 'dining', 'fine dining', 'bar', 'lounge']}
          />
        </>
        <div className='row'>
          <Button inverted border onClick={closeModal} text='Cancel'/>
          <Button type='submit' text='Submit' />
        </div>
      </form>
    </div>
  )
}