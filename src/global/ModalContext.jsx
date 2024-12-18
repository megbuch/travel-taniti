import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = () => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    setIsModalOpen(true)
  }

  const closeModal = () => {
    document.body.style.overflow = 'unset'
    setIsModalOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext)