import { useState, useRef } from 'react'
import { createAccommodation } from '../../api'
import { Button } from '../../components'
import ImageSearch from '../../components/ImageSearch'

export default function AccommodationEdit({ accommodation, onSave, onCancel }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const nameRef = useRef()
  const descriptionRef = useRef()
  const locationRef = useRef()
  const checkInTimeRef = useRef()
  const checkOutTimeRef = useRef()
  const amenitiesRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const ratingRef = useRef()

  const selectImage = image => {
    if (image) setSelectedImageUrl(image.urls.regular)
    else setSelectedImageUrl('')
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      const accommodationData = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        location: locationRef.current.value,
        checkInTime: checkInTimeRef.current.value,
        checkOutTime: checkOutTimeRef.current.value,
        amenities: amenitiesRef.current.value.split(',').map(a => a.trim().toLowerCase()),
        contactEmail: contactEmailRef.current.value,
        contactPhone: contactPhoneRef.current.value,
        rating: parseInt(ratingRef.current.value),
        imageURL: selectedImageUrl
      }
      const response = await createAccommodation(accommodationData)
      onSave(response?.accommodation)
    } catch (error) {
      console.log('Could not create accommodation.')
    }
  }

  return (
    <div className='form col'>
      <h1>{`${accommodation ? 'Edit': 'Create'} Accommodation`}</h1>
      <form onSubmit={save} className='col'>
        <>
          <p className='subtitle'>Name *</p>
          <input 
            ref={nameRef}
            type='text' 
            required 
            placeholder='The Grand Viridian Resort'
          />
        </>
        <>
          <p className='subtitle'>Description *</p>
          <textarea 
            ref={descriptionRef}
            required 
            rows='3' 
            placeholder='An upscale resort surrounded by verdant landscapes—where nature meets luxury.'
          />
        </>
        <>
          <p className='subtitle'>Location *</p>
          <input 
            ref={locationRef}
            type='text' 
            required 
            placeholder='273 Ocean Drive'
          />
        </>
        <>
          <p className='subtitle'>Check In Time *</p>
          <input 
            ref={checkInTimeRef}
            type='text' 
            required 
            placeholder='4 PM'
          />
        </>
        <>
          <p className='subtitle'>Check Out Time *</p>
          <input 
            ref={checkOutTimeRef}
            type='text' 
            required 
            placeholder='12 PM'
          />
        </>
        <>
          <p className='subtitle'>Amenities</p>
          <input 
            ref={amenitiesRef}
            type='text' 
            placeholder='Pools, Cabanas, Room Service, Spa Services'
          />
        </>
        <>
          <p className='subtitle'>Contact Email *</p>
          <input ref={contactEmailRef} type='email' required placeholder='email@example.com' />
        </>
        <>
          <p className='subtitle'>Contact Phone *</p>
          <input ref={contactPhoneRef} type='text' required placeholder='123-123-1234' />
        </>
        <>
          <p className='subtitle'>Rating</p>
          <input ref={ratingRef} type='number'  max='5' min='1' defaultValue={1} />
        </>
        <>
          <p className='subtitle'>Accommodation Image *</p>
          <ImageSearch 
            onSelect={selectImage}
            searchPlaceholder="Search for hotels, resorts, luxury..."
            quickSearchTerms={['ocean villa', 'beach hotel', 'luxury hotel', 'tropical resort']}
          />
        </>
        <div className='row'>
          <Button inverted withBorder onClick={onCancel} text='Cancel'/>
          <Button type='submit' text='Submit' />
        </div>
      </form>
    </div>
  )
}