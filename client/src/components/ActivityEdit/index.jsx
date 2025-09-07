import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createActivity, updateActivity } from '../../api'
import { ActivityDetails, Button, ImageSearch, DaysOfWeekPicker } from '..'
import { useModal } from '../../hooks'

export default function ActivityEdit({ activity, onSave, onDelete }) {
  const { openModal, closeModal } = useModal()
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [isRecurring, setIsRecurring] = useState(activity?.isRecurring || false)
  const [selectedDays, setSelectedDays] = useState(
    activity?.recurringDays || []
  )

  const nameRef = useRef()
  const descriptionRef = useRef()
  const locationRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const ratingRef = useRef()
  const companyNameRef = useRef()
  const durationMinutesRef = useRef()
  const pricePerPersonRef = useRef()
  const maxParticipantsRef = useRef()
  const oneTimeDateRef = useRef()
  const recurringTimeRef = useRef()
  const recurringStartDateRef = useRef()
  const recurringEndDateRef = useRef()

  const selectImage = image => {
    setSelectedImageURL(image ? image.urls.regular : '')
  }

  const toggleDay = day => {
    setSelectedDays(prev => prev.includes(day) 
      ? prev.filter(d => d !== day)
      : [...prev, day]
    )
  }

  const formatDateForInput = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      const baseActivityData = {
        name: nameRef.current.value.trim(),
        description: descriptionRef.current.value.trim(),
        location: locationRef.current.value.trim(),
        maxParticipants: parseInt(maxParticipantsRef.current.value),
        contactEmail: contactEmailRef.current?.value.trim() || null,
        contactPhone: contactPhoneRef.current?.value.trim() || null,
        rating: parseInt(ratingRef.current?.value) || null,
        imageURL: selectedImageURL || null,
        companyName: companyNameRef.current?.value.trim() || null,
        durationMinutes: parseInt(durationMinutesRef.current?.value) || null,
        pricePerPerson: pricePerPersonRef.current?.value || null,
        isRecurring
      }

      let activityData
      if (isRecurring) {
        if (selectedDays.length === 0) {
          toast.error('Please select at least one day for recurring activity')
          return
        }
        if (!recurringTimeRef.current?.value) {
          toast.error('Please select a time for recurring activity')
          return
        }
        if (!recurringStartDateRef.current?.value) {
          toast.error('Please select a start date for recurring activity')
          return
        }
        activityData = {
          ...baseActivityData,
          recurringDays: selectedDays,
          recurringTime: recurringTimeRef.current.value,
          recurringStartDate: recurringStartDateRef.current.value,
          recurringEndDate: recurringEndDateRef.current?.value || null,
          oneTimeDate: null
        }
      } else {
        if (!oneTimeDateRef.current?.value) {
          toast.error('Please select a date and time for one-time activity')
          return
        }
        activityData = {
          ...baseActivityData,
          oneTimeDate: new Date(oneTimeDateRef.current.value),
          recurringDays: null,
          recurringTime: null,
          recurringStartDate: null,
          recurringEndDate: null
        }
      }

      const response = activity 
        ? await updateActivity(activity.id, activityData)
        : await createActivity(activityData)

      if (activity) {
        toast.success('Updated activity')
        onSave(response?.activity)
        openModal(<ActivityDetails activity={response?.activity} onSave={onSave} onDelete={onDelete} />)
      } else {
        toast.success('Saved activity')
        onSave(response?.activity)
        closeModal()
      }
    } catch (error) {
      console.log('Could not create activity: ', error)
      toast.error('Could not create activity')
    }
  }

  return (
    <form onSubmit={save} className='col'>
      <h1>{`${activity ? 'Edit': 'Create'} Activity`}</h1>
      <div className='section'>
        <p className='subtitle'>Name *</p>
        <input 
          ref={nameRef}
          type='text' 
          required 
          placeholder='Jazz Festival'
          defaultValue={activity?.name}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Description *</p>
        <textarea 
          ref={descriptionRef}
          required 
          rows='3' 
          placeholder=''
          defaultValue={activity?.description}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Location *</p>
        <input 
          ref={locationRef}
          type='text' 
          required 
          placeholder=''
          defaultValue={activity?.location}
        />
      </div>
      <div className='section'>
        <p className='subtitle'>Activity Type *</p>
        <div className='row'>
          <div className='row'>
            <input type='radio'
              name='activityType'
              checked={!isRecurring}
              onChange={() => setIsRecurring(false)}
            />
            <p>One-time Event</p>
          </div>
          <div className='row'>
            <input
              type='radio'
              name='activityType'
              checked={isRecurring}
              onChange={() => setIsRecurring(true)}
            />
            <p>Recurring Activity</p>
          </div>
        </div>
      </div>
      {!isRecurring ? (
        <div className='section'>
          <p className='subtitle'>Date & Time *</p>
          <input 
            ref={oneTimeDateRef}
            type='datetime-local' 
            required
            defaultValue={activity?.oneTimeDate ? formatDateForInput(activity.oneTimeDate) : ''}
          />
        </div>
      ) : (
        <>
          <div className='section'>
            <p className='subtitle'>Recurring Days of Week *</p>
            <DaysOfWeekPicker selectedDays={selectedDays} onToggleDay={toggleDay} />
          </div>
          <div className='section'>
            <p className='subtitle'>Recurring Time *</p>
            <input 
              ref={recurringTimeRef}
              type='time'
              required={isRecurring}
              defaultValue={activity?.recurringTime}
            />
          </div>
          <div className='row'>
            <div className='section'>
              <p className='subtitle'>Start Date *</p>
              <input 
                ref={recurringStartDateRef}
                type='date'
                required={isRecurring}
                defaultValue={activity?.recurringStartDate}
              />
            </div>
            <div className='section'>
              <p className='subtitle'>End Date</p>
              <input 
                ref={recurringEndDateRef}
                type='date'
                defaultValue={activity?.recurringEndDate}
              />
            </div>
          </div>
        </>
      )}
      <div className='section'>
        <p className='subtitle'>Max Participants *</p>
        <input required ref={maxParticipantsRef} type='number' defaultValue={activity?.maxParticipants} />
      </div>
      <div className='section'>
        <p className='subtitle'>Rating</p>
        <select ref={ratingRef} defaultValue={activity?.rating}>
          <option value=''>Select rating...</option>
          <option value='1'>★</option> 
          <option value='2'>★★</option> 
          <option value='3'>★★★</option> 
          <option value='4'>★★★★</option> 
          <option value='5'>★★★★★</option> 
        </select>
      </div>
      <div className='section'>
        <p className='subtitle'>Duration Minutes</p>
        <input ref={durationMinutesRef} type='number' defaultValue={activity?.durationMinutes} />
      </div>
      <div className='section'>
        <p className='subtitle'>Price Per Person</p>
        <input ref={pricePerPersonRef} type='number' step='0.01' defaultValue={activity?.pricePerPerson} />
      </div>
      <div className='section'>
        <p className='subtitle'>Company Name</p>
        <input ref={companyNameRef} type='text' defaultValue={activity?.companyName} />
      </div>
      <div className='row'>
        <div className='col'>
          <p className='subtitle'>Email</p>
          <input ref={contactEmailRef} type='email' defaultValue={activity?.contactEmail} />
        </div>
        <div className='col'>
          <p className='subtitle'>Phone</p>
          <input ref={contactPhoneRef} type='text' defaultValue={activity?.contactPhone} />
        </div>
      </div>
      <div className='section'>
        <p className='subtitle'>Image</p>
        <ImageSearch 
          onSelect={selectImage}
          selectedImageURL={activity?.imageURL}
          searchPlaceholder="Search for activity images..."
          quickSearchTerms={['activity', 'event', 'recreation', 'entertainment']}
        />
      </div>
      <div className='row'>
        <Button inverted border onClick={closeModal} text='Cancel'/>
        <Button type='submit' text='Submit' />
      </div>
    </form>
  )
}