import { toast } from 'react-toastify';
import { useModal } from '../../hooks'
import { Button } from '../'
import './styles.scss'

export default function ContactForm() {
  const { closeModal } = useModal();
  
  const submit = e => {
    e.preventDefault()
    toast.success('Message successfully sent')
    closeModal()
  }

  return (
    <form onSubmit={submit} className='col'>
      <h1>Get in Touch</h1>
      <p>Let our experts help you plan your dream vacation!</p>
      <p className='subtitle'>A Taniti travel agent will contact you by email or phone within 24-48 hours.</p>
      <p className='subtitle'>
        Taniti Tourism Main Office<br />
        720 Palea Avenue<br />
        Taniti City, Taniti<br /><br />
        📞 &nbsp; (772) 891-9700<br />
        📧 &nbsp; inquiries@traveltaniti.com
      </p>
      <div className='section'>
        <p className='subtitle'>First Name *</p>
        <input type='text' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Last Name *</p>
        <input type='text' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Email *</p>
        <input type='email' required/>
      </div>
      <div className='section'>
        <p className='subtitle'>Phone </p>
        <input type='text' />
      </div>
      <div className='section'>
        <p className='subtitle'>Message *</p>
        <textarea required type='text' rows='4' />
      </div>
      <div className='row button-row'>
        <Button inverted onClick={closeModal} text='Cancel'/>
        <Button type='submit' text='Submit' />
      </div>
    </form>
  )
}