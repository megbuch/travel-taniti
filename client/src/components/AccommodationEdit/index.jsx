import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createAccommodation, updateAccommodation } from '../../api'
import { AccommodationDetails, Button, ImageSearch } from '..'
import { useModal } from '../../hooks'

export default function AccommodationEdit({ accommodation, onSave, onDelete, onRefresh }) {
  const { openModal, closeModal } = useModal()
  const [selectedImageURL, setSelectedImageURL] = useState('')
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
    setSelectedImageURL(image ? image.urls.regular : '')
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
        imageURL: selectedImageURL || null
      }
      const response = accommodation 
        ? await updateAccommodation(accommodation.id, accommodationData)
        : await createAccommodation(accommodationData)
      if (accommodation) {
        toast.success('Updated accommodation')
        onSave(response?.accommodation)
        openModal(<AccommodationDetails accommodation={response?.accommodation} onSave={onSave} onDelete={onDelete} onRefresh={onRefresh} />)
      } else {
        toast.success('Saved accommodation')
        onSave(response?.accommodation)
        closeModal()
      }
    } catch (error) {
      console.log('Could not create accommodation: ', error)
      toast.error('Could not create accommodation')
    }
  }

  return (
    <form onSubmit={save} className='col'>
      <h1>{`${accommodation ? 'Edit': 'Create'} Accommodation`}</h1>
      <div className='section'>
        <p className='subtitle'>Name *</p>
        <input 
          ref={nameRef}
          type='text' 
          required 
          placeholder='The Grand Viridian Resort'
          defaultValue={accommodation?.name}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Description *</p>
        <textarea 
          ref={descriptionRef}
          required 
          rows='3' 
          placeholder='An upscale resort surrounded by verdant landscapes—where nature meets luxury.'
          defaultValue={accommodation?.description}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Location *</p>
        <input 
          ref={locationRef}
          type='text' 
          required 
          placeholder='273 Ocean Drive'
          defaultValue={accommodation?.location}

        />
      </div>
      <div className='row'>
        <div className='section'>
          <p className='subtitle'>Check In *</p>
          <input 
            ref={checkInTimeRef}
            type='time' 
            required 
            defaultValue={accommodation?.checkInTime || '16:00'}
          />
        </div>
        <div className='section'>
          <p className='subtitle'>Check Out *</p>
          <input 
            ref={checkOutTimeRef}
            type='time' 
            required
            defaultValue={accommodation?.checkOutTime || '12:00'}
          />
        </div>
      </div>
      <div className='section'>
        <p className='subtitle'>Amenities</p>
        <input 
          ref={amenitiesRef}
          type='text' 
          placeholder='Pools, Cabanas, Room Service, Spa Services'
          defaultValue={accommodation?.amenities?.join(', ')}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Rating</p>
        <select ref={ratingRef} defaultValue={accommodation?.rating}>
          <option value='1'>★</option> 
          <option value='2'>★★</option> 
          <option value='3'>★★★</option> 
          <option value='4'>★★★★</option> 
          <option value='5'>★★★★★</option> 
        </select>
      </div>
      <div className='row'>
        <div className='section'>
          <p className='subtitle'>Contact Email</p>
          <input ref={contactEmailRef} type='email' defaultValue={accommodation?.contactEmail} />
        </div>
        <div className='section'>
          <p className='subtitle'>Contact Phone</p>
          <input ref={contactPhoneRef} type='text' defaultValue={accommodation?.contactPhone} />
        </div>
      </div>
      <div className='section'>
        <p className='subtitle'>Image</p>
        <ImageSearch 
          onSelect={selectImage}
          selectedImageURL={accommodation?.imageURL}
          searchPlaceholder="Search for hotels, resorts, luxury..."
          quickSearchTerms={['ocean villa', 'beach hotel', 'luxury hotel', 'tropical resort']}
        />
      </div>
      <div className='row'>
        <Button inverted border onClick={closeModal} text='Cancel'/>
        <Button type='submit' text='Submit' />
      </div>
    </form>
  )
}