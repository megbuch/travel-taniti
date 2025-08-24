// import { toast } from 'react-toastify';
import { useModal } from '../../contexts/ModalContext.jsx'
import './styles.scss'

export default function UserRegistrationForm() {
  const { isModalOpen, closeModal } = useModal();
  
  if (!isModalOpen) return <></>
  return (
    <div className='form col'>
      <h1>Create an Account</h1>
      <p>Access your itinerary and manage your bookings.</p>
      <form className='col'>
        <>
          <p className='subtitle'>First Name *</p>
          <input type='text' required/>
        </>
        <>
          <p className='subtitle'>Last Name *</p>
          <input type='text' required/>
        </>
        <>
          <p className='subtitle'>Email *</p>
          <input type='email' required/>
        </>
        <>
          <p className='subtitle'>Password *</p>
          <input type='password' required />
        </>
        <>
          <p className='subtitle'>Confirm Password *</p>
          <input type='password' required />
        </>
        <div className='row button-row'>
          <button onClick={closeModal} className='cancel-button'>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}