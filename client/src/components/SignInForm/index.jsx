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
      closeModal()
    } catch (error) {
      toast.error('Could not sign in')
    }
  }

  return (
    <form onSubmit={submit}>
      <h1>Sign In</h1>
      <p>Get access to your itinerary and manage your bookings.</p>
        <div className='section'>
          <p className='subtitle'>Email</p>
          <input ref={emailRef} type='email' required />
        </div>
        <div className='section'>
          <p className='subtitle'>Password</p>
          <input ref={passwordRef} type='password' required />
        </div>
        <div className='section'>
          <p className='row'>
            <span className='subtitle'>Need an account?</span>
            <span><Button short small backgroundless onClick={()=>openModal(<CreateAccountForm />)} text='Sign Up' /></span>
          </p>
          <p className='row'>
            <span className='subtitle'>Forgot your password?</span>
            <span><Button short small backgroundless text='Reset Password' /></span>
          </p>
        </div>
        <div className='row'>
          <Button inverted border onClick={closeModal} text='Cancel' />
          <Button type='submit' text='Submit' />
        </div>
      </form>
  )
}