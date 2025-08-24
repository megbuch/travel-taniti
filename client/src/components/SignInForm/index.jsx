import { useRef } from 'react'
import { toast } from 'react-toastify'
import { useModal, useSession } from '../../hooks'
import { CreateAccountForm, Button } from '../'
import { createAuthentication } from '../../api/'
import './styles.scss'

export default function SignInForm() {
  const { openModal, closeModal } = useModal()
  const { signIn } = useSession()
  const emailRef = useRef()
  const passwordRef = useRef()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim()
      }
      const response = await createAuthentication(userData)
      signIn(response.accessToken, response.user)
      toast.success('You are now signed in.')
      closeModal()
    } catch (error) {
      toast.error('Could not sign in.')
    }
  }

  return (
    <div className='form col'>
      <h1>Sign In</h1>
      <p>Get access to your itinerary and manage your bookings.</p>
      <form onSubmit={submit} className='col'>
        <>
          <p className='subtitle'>Email</p>
          <input ref={emailRef} type='email' required />
        </>
        <>
          <p className='subtitle'>Password</p>
          <input ref={passwordRef} type='password' required />
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