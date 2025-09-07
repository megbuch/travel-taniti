import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Button } from '..'
import { createRoomType } from '../../api'

export default function RoomTypeEdit({ accommodation, onSave, onCancel }) {
  const nameRef = useRef()
  const pricePerNightRef = useRef()
  const totalRoomsRef = useRef()
  const maxGuestsRef = useRef()
  const amenitiesRef = useRef()

  const save = async (e) => {
    e.preventDefault()
    try {
      const roomTypeData = {
        accommodationID: accommodation.id,
        name: nameRef.current.value,
        pricePerNight: pricePerNightRef.current.value,
        totalRooms: totalRoomsRef.current.value,
        availableRooms: totalRoomsRef.current.value,
        maxGuests: maxGuestsRef.current.value,
        amenities: amenitiesRef.current?.value 
          ? amenitiesRef.current.value.split(',').map(a => a.trim()) 
          : [],
      }
      await createRoomType(roomTypeData)
      toast.success('Room type created')
      onSave()
    } catch (error) {
      console.log('Could not create room type: ', error)
      toast.error('Could not create room type')
    }
  }

  return (
    <form onSubmit={save} className='col'>
      <p className='emphasized-small'>Create Room Type</p>
      <div className='row'>
        <div className='section'>
          <p className='subtitle'>Name *</p>
          <input ref={nameRef} type='text' required placeholder='Ocean Suite' />
        </div>
        <div className='section'>
          <p className='subtitle'>Price Per Night *</p>
          <input ref={pricePerNightRef} type='number' required placeholder='599.00'/>
        </div>
      </div>
      <div className='row'>
        <div className='section'>
          <p className='subtitle'>Total Rooms *</p>
          <input ref={totalRoomsRef} type='number' required placeholder='20' />
        </div>
        <div className='section'>
          <p className='subtitle'>Max Guests *</p>
          <input ref={maxGuestsRef} type='number' required placeholder='4'/>
        </div>
      </div>
      <div className='section'>
        <p className='subtitle'>Amenities</p>
        <input ref={amenitiesRef} type='text' placeholder='Minibar, Laundry, Housekeeping, Room Service, Turndown Service' />
      </div>
      <div className='row'>
        <Button inverted border onClick={onCancel} text='Cancel'/>
        <Button type='submit' text='Submit' />
      </div>
    </form>
  )
}