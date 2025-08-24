import { useModal } from '../../hooks'
import './styles.scss'

export default function Modal() {
  const { isModalOpen, modalContent, closeModal } = useModal()

  if (!isModalOpen) return <></>
  return (
    <div className='modal-backdrop' onClick={closeModal}>
      <div className='modal-container' onClick={e => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  )
}