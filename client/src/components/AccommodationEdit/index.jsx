import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createAccommodation, updateAccommodation } from '../../api'
import { AccommodationDetails, Button, ImageSearch } from '..'
import { useModal } from '../../hooks'

export default function AccommodationEdit({ accommodation, onSave }) {
  const { openModal, closeModal } = useModal()
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
        amenities: amenitiesRef.current?.value 
          ? amenitiesRef.current.value.split(',').map(a => a.trim().toLowerCase()) 
          : [],
        contactEmail: contactEmailRef.current.value.trim() || null,
        contactPhone: contactPhoneRef.current.value.trim() || null,
        rating: parseInt(ratingRef.current?.value) || null,
        imageURL: selectedImageUrl || accommodation?.imageURL || null
      }
      const response = accommodation 
        ? await updateAccommodation(accommodation.id, accommodationData)
        : await createAccommodation(accommodationData)
      if (accommodation) {
        onSave(response?.accommodation)
        openModal(<AccommodationDetails accommodation={response?.accommodation} onSave={onSave} />)
      } else {
        onSave(response?.accommodation)
        closeModal()
      }
    } catch (error) {
      console.log('Could not create accommodation: ', error)
      toast.error('Could not create accommodation')
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
            defaultValue={accommodation?.name}
          />
        </>
        <>
          <p className='subtitle'>Description *</p>
          <textarea 
            ref={descriptionRef}
            required 
            rows='3' 
            placeholder='An upscale resort surrounded by verdant landscapes—where nature meets luxury.'
            defaultValue={accommodation?.description}
          />
        </>
        <>
          <p className='subtitle'>Location *</p>
          <input 
            ref={locationRef}
            type='text' 
            required 
            placeholder='273 Ocean Drive'
            defaultValue={accommodation?.location}

          />
        </>
        <>
          <p className='subtitle'>Check In *</p>
          <input 
            ref={checkInTimeRef}
            type='text' 
            required 
            placeholder='4 PM'
            defaultValue={accommodation?.checkInTime}
          />
        </>
        <>
          <p className='subtitle'>Check Out *</p>
          <input 
            ref={checkOutTimeRef}
            type='text' 
            required 
            placeholder='12 PM'
            defaultValue={accommodation?.checkOutTime}
          />
        </>
        <>
          <p className='subtitle'>Amenities</p>
          <input 
            ref={amenitiesRef}
            type='text' 
            placeholder='Pools, Cabanas, Room Service, Spa Services'
            defaultValue={accommodation?.amenities?.join(', ')}
          />
        </>
        <>
          <p className='subtitle'>Rating</p>
          <input ref={ratingRef} type='number'  max='5' min='1' defaultValue={accommodation?.rating} />
        </>
        <>
          <p className='subtitle'>Contact Email</p>
          <input ref={contactEmailRef} type='email' defaultValue={accommodation?.contactEmail} />
        </>
        <>
          <p className='subtitle'>Contact Phone</p>
          <input ref={contactPhoneRef} type='text' defaultValue={accommodation?.contactPhone} />
        </>
        <>
          <p className='subtitle'>Image</p>
          <ImageSearch 
            onSelect={selectImage}
            selectedImageURL={accommodation?.imageURL}
            searchPlaceholder="Search for hotels, resorts, luxury..."
            quickSearchTerms={['ocean villa', 'beach hotel', 'luxury hotel', 'tropical resort']}
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