import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createActivity, updateActivity } from '../../api'
import { ActivityDetails, Button, ImageSearch } from '..'
import { useModal } from '../../hooks'

export default function ActivityEdit({ activity, onSave, onDelete }) {
  const { openModal, closeModal } = useModal()
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const nameRef = useRef()
  const descriptionRef = useRef()
  const locationRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const ratingRef = useRef()
  const companyNameRef = useRef()
  const dateRef = useRef()
  const durationMinutesRef = useRef()
  const pricePerPersonRef = useRef()
  const maxParticipantsRef = useRef()
 
  const selectImage = image => {
    setSelectedImageURL(image ? image.urls.regular : '')
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      const activityData = {
        name: nameRef.current.value.trim(),
        description: descriptionRef.current.value.trim(),
        location: locationRef.current.value.trim(),
        contactEmail: contactEmailRef.current.value.trim() || null,
        contactPhone: contactPhoneRef.current.value.trim() || null,
        rating: parseInt(ratingRef.current?.value) || null,
        imageURL: selectedImageURL || activity?.imageURL || null,
        companyName: companyNameRef.current.value.trim(),
        date: new Date(dateRef.current.value),
        durationMinutes: parseInt(durationMinutesRef.current.value) || null,
        pricePerPerson: pricePerPersonRef.current.value || null,
        maxParticipants: parseInt(maxParticipantsRef.current.value) || null
      }
      const response = activity 
        ? await updateActivity(activity.id, activityData)
        : await createActivity(activityData)
      if (activity) {
        onSave(response?.activity)
        openModal(<ActivityDetails activity={response?.activity} onSave={onSave} onDelete={onDelete} />)
      } else {
        onSave(response?.activity)
        closeModal()
      }
    } catch (error) {
      console.log('Could not create activity: ', error)
      toast.error('Could not create activity')
    }
  }

  return (
    <div className='form col'>
      <h1>{`${activity ? 'Edit': 'Create'} Activity`}</h1>
      <form onSubmit={save} className='col'>
        <>
          <p className='subtitle'>Name *</p>
          <input 
            ref={nameRef}
            type='text' 
            required 
            placeholder='Jazz Festival'
            defaultValue={activity?.name}
          />
        </>
        <>
          <p className='subtitle'>Description *</p>
          <textarea 
            ref={descriptionRef}
            required 
            rows='3' 
            placeholder=''
            defaultValue={activity?.description}
          />
        </>
        <>
          <p className='subtitle'>Location *</p>
          <input 
            ref={locationRef}
            type='text' 
            required 
            placeholder=''
            defaultValue={activity?.location}

          />
        </>
        <>
          <p className='subtitle'>Date *</p>
          <input required ref={dateRef} type='date' defaultValue={activity?.date} />
        </>
        <>
          <p className='subtitle'>Max Participants *</p>
          <input required ref={maxParticipantsRef} type='number' defaultValue={activity?.maxParticipants} />
        </>
        <>
          <p className='subtitle'>Rating</p>
          <select ref={ratingRef} defaultValue={activity?.rating}>
            <option value='1'>★</option> 
            <option value='2'>★★</option> 
            <option value='3'>★★★</option> 
            <option value='4'>★★★★</option> 
            <option value='5'>★★★★★</option> 
          </select>
        </>
        <>
          <p className='subtitle'>Company Name</p>
          <input ref={companyNameRef} type='text' defaultValue={activity?.companyName} />
        </>
        <>
          <p className='subtitle'>Duration Minutes</p>
          <input ref={durationMinutesRef} type='number' defaultValue={activity?.durationMinutes} />
        </>
        <>
          <p className='subtitle'>Price Per Person</p>
          <input ref={pricePerPersonRef} type='number' defaultValue={activity?.pricePerPerson} />
        </>
        <>
          <p className='subtitle'>Contact Email</p>
          <input ref={contactEmailRef} type='email' defaultValue={activity?.contactEmail} />
        </>
        <>
          <p className='subtitle'>Contact Phone</p>
          <input ref={contactPhoneRef} type='text' defaultValue={activity?.contactPhone} />
        </>
        <>
          <p className='subtitle'>Image</p>
          <ImageSearch 
            onSelect={selectImage}
            selectedImageURL={activity?.imageURL}
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