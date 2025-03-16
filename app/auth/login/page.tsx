'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  FaHorse, FaLock, FaEnvelope, FaEye, FaEyeSlash, 
  FaInfoCircle, FaLeaf, FaCloud, FaSun, FaMountain,
  FaExclamationCircle, FaCheckCircle
} from 'react-icons/fa'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const MIN_PASSWORD_LENGTH = 6

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [animacaoConcluida, setAnimacaoConcluida] = useState(false)
  const [mostrarDica, setMostrarDica] = useState(false)
  const [sucessoLogin, setSucessoLogin] = useState(false)
  
  // Estado de validação
  const [emailValido, setEmailValido] = useState<boolean | null>(null)
  const [senhaValida, setSenhaValida] = useState<boolean | null>(null)
  const [tentativas, setTentativas] = useState(0)
  
  // Validar email quando é alterado
  useEffect(() => {
    if (email) {
      setEmailValido(EMAIL_REGEX.test(email))
    }
  }, [email])
  
  // Validar senha quando é alterada
  useEffect(() => {
    if (password) {
      setSenhaValida(password.length >= MIN_PASSWORD_LENGTH)
    }
  }, [password])
  
  useEffect(() => {
    // Animar entrada dos elementos após carregar a página
    const timer = setTimeout(() => {
      setAnimacaoConcluida(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  const limparFormulario = () => {
    setEmail('')
    setPassword('')
    setEmailValido(null)
    setSenhaValida(null)
  }
  
  const realizarLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos
    const emailEstaValido = EMAIL_REGEX.test(email)
    const senhaEstaValida = password.length >= MIN_PASSWORD_LENGTH
    
    setEmailValido(emailEstaValido)
    setSenhaValida(senhaEstaValida)
    
    if (!emailEstaValido || !senhaEstaValida) {
      setErro('Por favor, corrija os campos destacados')
      return
    }
    
    try {
      setErro('')
      setCarregando(true)
      
      // Simulação de login (em ambiente real, isso seria uma chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Versão modificada da validação para aceitar mais credenciais
      const credenciaisValidas = [
        { email: 'admin@example.com', senha: 'senha123' },
        { email: 'gerente@example.com', senha: 'senha123' },
        { email: 'usuario@example.com', senha: 'senha123' },
        { email: 'teste@teste.com', senha: 'teste123' },
      ]
      
      const credencialValida = credenciaisValidas.some(
        cred => cred.email === email && cred.senha === password
      )
      
      if (credencialValida) {
        // Mostrar mensagem de sucesso antes de redirecionar
        setSucessoLogin(true)
        
        // Armazenar token JWT simulado
        localStorage.setItem('auth_token', 'jwt_token_simulado')
        
        // Armazenar email se "lembrar-me" estiver ativado
        if (rememberMe) {
          localStorage.setItem('remembered_email', email)
        } else {
          localStorage.removeItem('remembered_email')
        }
        
        // Aguardar um pouco para mostrar a mensagem de sucesso
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Redirecionar para o dashboard
        router.push('/dashboard')
      } else {
        setErro('Email ou senha incorretos')
        setMostrarDica(true) // Mostrar dica de credenciais
        setTentativas(prev => prev + 1)
        
        // Limpar o formulário após muitas tentativas
        if (tentativas >= 3) {
          limparFormulario()
        }
      }
    } catch (error) {
      setErro('Erro ao realizar login. Tente novamente.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }
  
  // Verificar se há um email lembrado ao carregar
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-primary-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Elementos decorativos de fundo animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-green-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Elementos naturais flutuantes adicionais */}
        <div className="absolute top-1/4 right-1/4">
          <FaCloud className="text-blue-200 text-5xl animate-float" style={{animationDelay: '0s'}} />
        </div>
        <div className="absolute top-1/3 left-1/3">
          <FaCloud className="text-blue-100 text-4xl animate-float" style={{animationDelay: '1.5s'}} />
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <FaLeaf className="text-green-300 text-2xl animate-float" style={{animationDelay: '0.7s', animationDuration: '3s'}} />
        </div>
        <div className="absolute top-1/5 right-1/5">
          <FaSun className="text-yellow-200 text-4xl animate-spin-slow" />
        </div>
        <div className="absolute bottom-1/5 left-1/6">
          <FaMountain className="text-green-600 text-4xl opacity-10" />
        </div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Logotipo e cabeçalho */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center justify-center p-5 bg-white rounded-full shadow-lg mb-5 animate-bounce-custom" style={{animationDuration: '5s'}}>
            <FaHorse className="text-gradient-primary text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-shadow">GadoGest</h1>
          <p className="text-gray-600 mt-2 animate-pulse-custom">Sistema de Gestão para Fazenda de Gado</p>
        </div>
        
        {/* Card de login */}
        <div className={`bg-white rounded-xl shadow-xl p-8 transform transition-all duration-700 backdrop-blur-sm border border-white border-opacity-20 ${animacaoConcluida ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center relative">
            Acesso ao Sistema
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-500 rounded-full"></span>
          </h2>
          
          {/* Informações de login (visível sempre) */}
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6 animate-fadeIn shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start">
              <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0 animate-pulse-custom" />
              <div>
                <p className="text-sm font-medium mb-1">Credenciais para demonstração:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white rounded p-2 shadow-sm border border-blue-100">
                    <p className="font-semibold">Email:</p>
                    <p className="text-primary-600">admin@example.com</p>
                  </div>
                  <div className="bg-white rounded p-2 shadow-sm border border-blue-100">
                    <p className="font-semibold">Senha:</p>
                    <p className="text-primary-600">senha123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mensagem de sucesso */}
          {sucessoLogin && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 animate-fadeIn shadow-sm flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span>Login realizado com sucesso! Redirecionando...</span>
            </div>
          )}
          
          {/* Mensagem de erro */}
          {erro && !sucessoLogin && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 animate-fadeIn shadow-sm">
              <p className="flex items-center">
                <FaExclamationCircle className="w-5 h-5 mr-2 text-red-500" />
                {erro}
              </p>
              {mostrarDica && tentativas >= 2 && (
                <p className="text-xs mt-2 text-red-600">
                  Dica: Tente usar uma das credenciais de demonstração acima.
                </p>
              )}
            </div>
          )}
          
          <form onSubmit={realizarLogin} className="space-y-6">
            <div className="animate-slideInRight delay-100">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                <span>Email</span>
                {emailValido === false && (
                  <span className="text-red-500 text-xs">Email inválido</span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`${emailValido === false ? 'text-red-400' : emailValido === true ? 'text-green-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`input-field pl-10 transition-all duration-300 ${
                    emailValido === false 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : emailValido === true
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                  placeholder="Seu email de acesso"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              {emailValido === false && (
                <p className="mt-1 text-xs text-red-500">Digite um email válido</p>
              )}
            </div>
            
            <div className="animate-slideInRight delay-200">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span>Senha</span>
                  {senhaValida === false && (
                    <span className="text-red-500 text-xs">Senha muito curta</span>
                  )}
                </label>
                <Link 
                  href="/auth/recuperar-senha" 
                  className="text-sm text-primary-600 hover:text-primary-800 hover:underline highlight transform transition-all duration-300 hover:translate-x-1"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`${senhaValida === false ? 'text-red-400' : senhaValida === true ? 'text-green-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  className={`input-field pl-10 pr-10 transition-all duration-300 ${
                    senhaValida === false 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : senhaValida === true
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? (
                    <FaEyeSlash className="animate-fadeIn" />
                  ) : (
                    <FaEye className="animate-fadeIn" />
                  )}
                </button>
              </div>
              {senhaValida === false && (
                <p className="mt-1 text-xs text-red-500">A senha deve ter pelo menos {MIN_PASSWORD_LENGTH} caracteres</p>
              )}
            </div>
            
            <div className="flex items-center mb-6 animate-slideInRight delay-300">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors duration-200"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar meus dados
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary py-3 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-blue shadow-lg hover:shadow-xl animate-slideInRight delay-400"
              disabled={carregando || sucessoLogin}
            >
              {carregando ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Entrando...</span>
                </>
              ) : sucessoLogin ? (
                <>
                  <FaCheckCircle className="mr-2" />
                  <span>Autenticado</span>
                </>
              ) : (
                <span className="py-1">Entrar</span>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center animate-slideInRight delay-500">
            <p className="text-sm text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link 
                href="/auth/cadastro" 
                className="text-primary-600 hover:text-primary-800 font-medium hover:underline highlight"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
        
        {/* Rodapé */}
        <div className={`text-center mt-8 text-sm text-gray-600 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <p className="text-shadow-sm">GadoGest &copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
} 