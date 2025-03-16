'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHorse, FaCheckCircle, FaLongArrowAltRight } from 'react-icons/fa'

export default function CadastroSucessoPage() {
  const router = useRouter()
  const [animacaoConcluida, setAnimacaoConcluida] = useState(false)
  
  useEffect(() => {
    // Animar entrada dos elementos após carregar a página
    const timer = setTimeout(() => {
      setAnimacaoConcluida(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-primary-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Logotipo e cabeçalho */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-4">
            <FaHorse className="text-primary-600 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">GadoGest</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão para Fazenda de Gado</p>
        </div>
        
        {/* Card de sucesso */}
        <div className={`bg-white rounded-xl shadow-xl p-8 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado com Sucesso!</h2>
            <p className="text-gray-600 mb-8">
              Sua conta foi criada e você já pode começar a utilizar o sistema GadoGest para gerenciar sua fazenda de maneira eficiente.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Link 
                href="/auth/login" 
                className="btn-primary py-3 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300"
              >
                <span>Ir para o Login</span>
                <FaLongArrowAltRight className="ml-2" />
              </Link>
              
              <Link 
                href="/sobre/como-usar" 
                className="text-primary-600 hover:text-primary-800 font-medium hover:underline text-sm"
              >
                Saiba como começar a usar o sistema
              </Link>
            </div>
          </div>
        </div>
        
        {/* Rodapé */}
        <div className={`text-center mt-8 text-sm text-gray-600 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <p>GadoGest &copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
} 