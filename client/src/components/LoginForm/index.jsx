import { useModal } from '../../contexts/ModalContext.jsx'
import { CreateAccountForm } from '../'
import './styles.scss'

export default function LoginForm() {
  const { isModalOpen, openModal, closeModal } = useModal();

  if (!isModalOpen) return <></>
  return (
    <div className='form col'>
      <h1>Sign In</h1>
      <p>Get access to your itinerary and manage your bookings.</p>
      <form className='col'>
        <>
          <p className='subtitle'>Email</p>
          <input type='email' />
        </>
        <>
          <p className='subtitle'>Password</p>
          <input type='password' />
        </>
        <button onClick={()=>openModal(<CreateAccountForm />)} className='small-btn'>Create an Account</button>
        <div className='row button-row'>
          <button onClick={closeModal} className='cancel-button'>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}