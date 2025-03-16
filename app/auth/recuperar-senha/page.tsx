'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaHorse, FaEnvelope, FaArrowLeft } from 'react-icons/fa'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [animacaoConcluida, setAnimacaoConcluida] = useState(false)
  
  useEffect(() => {
    // Animar entrada dos elementos após carregar a página
    const timer = setTimeout(() => {
      setAnimacaoConcluida(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  const enviarSolicitacao = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErro('Por favor, informe seu email')
      return
    }
    
    try {
      setErro('')
      setCarregando(true)
      
      // Simulação de envio (em ambiente real, isso seria uma chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Em um sistema real, você enviaria o email para o backend
      // e o backend enviaria um email com um link de redefinição
      setEnviado(true)
    } catch (error) {
      setErro('Erro ao processar solicitação. Tente novamente.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-primary-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-green-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
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
        
        {/* Card de recuperação de senha */}
        <div className={`bg-white rounded-xl shadow-xl p-8 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {!enviado ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Recuperar Senha</h2>
              <p className="text-gray-600 text-center mb-6">
                Insira o email associado à sua conta para receber instruções de redefinição de senha
              </p>
              
              {erro && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 animate-fadeIn">
                  <p>{erro}</p>
                </div>
              )}
              
              <form onSubmit={enviarSolicitacao}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="input-field pl-10"
                      placeholder="Seu email de cadastro"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={carregando}
                >
                  {carregando ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Enviar Instruções</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Enviado</h2>
              <p className="text-gray-600 mb-6">
                Enviamos instruções para redefinir sua senha para <strong>{email}</strong>. 
                Por favor, verifique sua caixa de entrada e siga as instruções.
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Se não encontrar o email, verifique sua pasta de spam ou lixo eletrônico.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link 
              href="/auth/login" 
              className="text-primary-600 hover:text-primary-800 font-medium hover:underline highlight flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Voltar para o login
            </Link>
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