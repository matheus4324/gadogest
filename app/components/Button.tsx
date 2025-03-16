import React from 'react'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  external?: boolean
  loadingText?: string
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  external = false,
  loadingText,
  className = '',
  ...props
}) => {
  // Mapear variantes para classes CSS
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
    light: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white',
    link: 'bg-transparent text-primary-600 hover:text-primary-800 hover:underline p-0'
  }

  // Mapear tamanhos para classes CSS
  const sizeClasses = {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2.5 px-5 text-base',
    xl: 'py-3 px-6 text-lg'
  }

  // Construir classes de estilo
  const buttonClasses = `
    ${variantClasses[variant]}
    ${variant !== 'link' ? sizeClasses[size] : ''}
    ${fullWidth ? 'w-full' : ''}
    font-medium rounded-md
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
    ${isLoading ? 'opacity-80 cursor-not-allowed' : 'active:scale-95 transform'}
    flex items-center justify-center
    ${className}
  `

  // Se o botão for um link
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    
    return (
      <Link href={href} {...linkProps} className={buttonClasses}>
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Link>
    )
  }

  // Botão padrão
  return (
    <button 
      className={buttonClasses} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

export default Button 