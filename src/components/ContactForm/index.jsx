import { useModal } from '../../global/ModalContext.jsx'
import './styles.scss'

export default function ContactForm() {
  const { isModalOpen, closeModal } = useModal();
  
  if (!isModalOpen) return null
  return (
    <div className='contact-form col'>
      <h1>Get in Touch</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo illo optio et obcaecati quis vel aspernatur unde eius quibusdam, iusto ad officiis natus eveniet corrupti nulla quidem repudiandae impedit in?</p>
      <form className='col'>
        <>
          <p className='subtitle' required>First Name *</p>
          <input type='text' />
        </>
        <>
          <p className='subtitle' required>Last Name *</p>
          <input type='text' />
        </>
        <>
          <p className='subtitle' required>Email *</p>
          <input type='text' />
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