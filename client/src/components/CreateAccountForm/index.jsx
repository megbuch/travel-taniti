import { useRef } from 'react'
import { toast } from 'react-toastify'
import { useModal, useSession } from '../../hooks'
import { Button } from '../'
import { createUser } from '../../api/'
import './styles.scss'

export default function CreateAccountForm() {
  const { closeModal } = useModal()
  const { signIn } = useSession()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  
  const submit = async (e) => {
    e.preventDefault()
    try {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        return toast.error("Passwords don't match.")
      }
      const userData = {
        firstName: firstNameRef.current.value.trim(),
        lastName: lastNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value
      }
      const response = await createUser(userData)
      signIn(response.accessToken, response.user)
      toast.success('Your account has been created.')
      closeModal()
    } catch (error) {
      toast.error('Your account could not be created. Please try again.')
    }
  }

  return (
    <form onSubmit={submit} className='col'>
      <h1>Create an Account</h1>
      <p>Access your itinerary and manage your bookings.</p>
      <div className='section'>
        <p className='subtitle'>First Name *</p>
        <input ref={firstNameRef} type='text' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Last Name *</p>
        <input ref={lastNameRef} type='text' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Email *</p>
        <input ref={emailRef} type='email' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Password *</p>
        <input ref={passwordRef} type='password' minLength='8' required />
      </div>
      <div className='section'>
        <p className='subtitle'>Confirm Password *</p>
        <input ref={confirmPasswordRef} type='password' minLength='8' required />
      </div>
      <div className='row button-row'>
        <Button inverted border onClick={closeModal} text='Cancel' />
        <Button type='submit' text='Submit' />
      </div>
    </form>
  )
}