import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  centered?: boolean
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnClickOutside = true,
  closeOnEsc = true,
  centered = true,
  showCloseButton = true
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    // Verificar se estamos executando no navegador
    setIsMounted(true)
  }, [])
  
  useEffect(() => {
    if (isOpen) {
      // Adicionar classe de animação quando o modal abrir
      setAnimationClass('animate-zoomIn')
      
      // Impedir o scroll da página quando o modal estiver aberto
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar o scroll quando o modal fechar
      document.body.style.overflow = 'visible'
    }
    
    return () => {
      // Restaurar o scroll ao desmontar o componente
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])
  
  // Lidar com tecla Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeOnEsc, onClose])

  // Mapear tamanhos para classes CSS
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }

  // Função para clique no backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      onClose()
    }
  }

  // Retornar null se o modal estiver fechado ou se estivermos no servidor
  if (!isOpen || !isMounted) {
    return null
  }

  // Renderizar modal no portal
  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex animate-fadeIn"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`relative ${sizeClasses[size]} w-full bg-white rounded-lg shadow-xl m-4 ${animationClass} ${
          centered ? 'mx-auto my-auto' : 'mx-auto mt-16'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {showCloseButton && (
            <button
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        {/* Body */}
        <div className="p-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="p-4 border-t flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// Componente de confirmação pré-configurado
interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'danger' | 'success'
  isLoading?: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button 
            variant="light" 
            onClick={onClose} 
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            variant={confirmVariant} 
            onClick={onConfirm} 
            isLoading={isLoading}
            loadingText="Processando..."
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="py-2">{message}</div>
    </Modal>
  )
}

export default Modal 