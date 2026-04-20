import { createContext, useContext, useState } from 'react'

const ContactModalContext = createContext(null)

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ContactModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  return useContext(ContactModalContext)
}
