import { toast } from 'react-toastify';
import { useModal } from '../../global/ModalContext.jsx'
import './styles.scss'

export default function ContactForm() {
  const { isModalOpen, closeModal } = useModal();
  
  const submit = e => {
    e.preventDefault()
    toast.success('Message successfully sent')
    closeModal()
  }

  if (!isModalOpen) return null
  return (
    <div className='contact-form col'>
      <h1>Get in Touch</h1>
      <p>Let our experts help you plan your dream vacation!</p>
      <p className='subtitle'>A Taniti travel agent will contact you by email or phone within 24-48 hours.</p>
      <form onSubmit={submit} className='col'>
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
          <p className='subtitle'>Phone </p>
          <input type='text' />
        </>
        <>
          <p className='subtitle'>Message *</p>
          <textarea required type='text' rows='4' />
        </>
        <div className='row button-row'>
          <button onClick={closeModal} className='cancel-button'>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}