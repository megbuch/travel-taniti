import { useModal } from '../../contexts/ModalContext.jsx'
import { CreateAccountForm, Button } from '../'
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
        <Button small onClick={()=>openModal(<CreateAccountForm />)} text='Create an Account' />
        <div className='row button-row'>
          <Button outline onClick={closeModal} text='Cancel' />
          <Button type='submit' text='Submit' />
        </div>
      </form>
    </div>
  )
}