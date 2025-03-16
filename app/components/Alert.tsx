import React from 'react'
import { 
  FaInfoCircle, 
  FaExclamationCircle, 
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa'

export type AlertType = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  type: AlertType
  title?: string
  message: string | React.ReactNode
  onClose?: () => void
  className?: string
  autoClose?: boolean
  autoCloseTime?: number
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
  autoClose = false,
  autoCloseTime = 5000
}) => {
  // Fechar automaticamente após o tempo determinado
  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoClose && onClose) {
      timer = setTimeout(() => {
        onClose()
      }, autoCloseTime)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, onClose])

  // Configurações de estilo baseadas no tipo
  const alertStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FaInfoCircle className="text-blue-500" />,
      iconBg: 'bg-blue-100'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <FaCheckCircle className="text-green-500" />,
      iconBg: 'bg-green-100'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      iconBg: 'bg-yellow-100'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <FaExclamationCircle className="text-red-500" />,
      iconBg: 'bg-red-100'
    }
  }

  const style = alertStyles[type]

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 mb-4 animate-fadeIn ${className}`}>
      <div className="flex">
        <div className={`flex-shrink-0 mr-3 ${style.iconBg} p-2 rounded-full`}>
          {style.icon}
        </div>
        <div className="flex-1">
          {title && <h3 className={`text-sm font-medium ${style.text}`}>{title}</h3>}
          <div className={`text-sm ${style.text}`}>{message}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${style.bg} ${style.text} rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-opacity-75 focus:outline-none`}
            onClick={onClose}
            aria-label="Fechar"
          >
            <span className="sr-only">Fechar</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert 