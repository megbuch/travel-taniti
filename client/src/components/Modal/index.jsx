import { useModal } from '../../contexts/ModalContext.jsx'
import './styles.scss'

export default function Modal() {
  const { isModalOpen, modalContent, closeModal } = useModal()

  if (!isModalOpen) return <></>
  console.log(modalContent)
  return (
    <div className='modal-backdrop' onClick={closeModal}>
      <div className='modal-container' onClick={e => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  )
}