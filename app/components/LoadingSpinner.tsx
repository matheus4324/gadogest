import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray' | 'success' | 'warning' | 'danger'
  text?: string
  fullScreen?: boolean
  overlay?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  overlay = false
}) => {
  // Tamanhos disponíveis
  const sizeMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4'
  }
  
  // Cores disponíveis
  const colorMap = {
    primary: 'border-primary-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
    success: 'border-green-500 border-t-transparent',
    warning: 'border-yellow-500 border-t-transparent',
    danger: 'border-red-500 border-t-transparent'
  }
  
  // Classes CSS para o spinner
  const spinnerClasses = `inline-block rounded-full animate-spin ${sizeMap[size]} ${colorMap[color]}`
  
  // Container para versão de tela cheia
  if (fullScreen) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${overlay ? 'bg-black bg-opacity-50' : ''}`}>
        <div className="text-center">
          <div className={spinnerClasses}></div>
          {text && (
            <div className={`mt-4 font-medium ${color === 'white' ? 'text-white' : 'text-gray-700'}`}>
              {text}
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Versão inline
  return (
    <div className="flex items-center justify-center">
      <div className={spinnerClasses}></div>
      {text && (
        <div className={`ml-3 font-medium ${color === 'white' ? 'text-white' : 'text-gray-700'}`}>
          {text}
        </div>
      )}
    </div>
  )
}

export default LoadingSpinner 