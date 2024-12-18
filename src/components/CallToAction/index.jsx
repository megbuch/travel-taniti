import { useModal } from '../../global/ModalContext.jsx'
import './styles.scss'

export default function CallToAction() {
  const { openModal } = useModal();

  return (
    <div className='call-to-action col'>
      <div className='text-section'>
        <h2>Get in Touch ✍️</h2>
        <p className='subtitle'>
          Taniti Tourism Main Office<br />
          720 Palea Avenue<br />
          Taniti City, Taniti<br /><br />
          📞 &nbsp; (772) 891-9700<br />
          📧 &nbsp; inquiries@traveltaniti.com
        </p>
      </div>
      <div className='col'>
        <p>
          <span className='emphasized-small'>Let us plan your perfect trip!</span><br /><br />
          Our local tourism experts can help you discover everything Taniti has to offer.<br />
          Contact us today to learn more about activities, dining, lodging, transportation, and more.
        </p>
        <button onClick={openModal}>Contact Us</button>
      </div>
    </div>
  )
}