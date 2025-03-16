'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHorse, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaUser, FaBuilding, FaArrowLeft } from 'react-icons/fa'

type ErrorsType = {
  nome?: string
  email?: string
  fazenda?: string
  senha?: string
  confirmarSenha?: string
}

export default function CadastroPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [fazenda, setFazenda] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [aceitarTermos, setAceitarTermos] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [errors, setErrors] = useState<ErrorsType>({})
  const [carregando, setCarregando] = useState(false)
  const [animacaoConcluida, setAnimacaoConcluida] = useState(false)
  const [etapa, setEtapa] = useState(1)
  
  useEffect(() => {
    // Animar entrada dos elementos após carregar a página
    const timer = setTimeout(() => {
      setAnimacaoConcluida(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Validar campos na primeira etapa
  const validarEtapa1 = () => {
    const newErrors: ErrorsType = {}
    
    if (!nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!fazenda.trim()) {
      newErrors.fazenda = 'Nome da fazenda é obrigatório'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Validar campos na segunda etapa
  const validarEtapa2 = () => {
    const newErrors: ErrorsType = {}
    
    if (!senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    if (!confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme sua senha'
    } else if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Avançar para a próxima etapa
  const avancarEtapa = () => {
    if (validarEtapa1()) {
      setEtapa(2)
    }
  }
  
  // Voltar para a etapa anterior
  const voltarEtapa = () => {
    setEtapa(1)
  }
  
  // Realizar o cadastro
  const realizarCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validarEtapa2()) {
      return
    }
    
    if (!aceitarTermos) {
      setErro('Você precisa aceitar os termos e condições para continuar')
      return
    }
    
    try {
      setErro('')
      setCarregando(true)
      
      // Dados do novo usuário
      const novoUsuario = {
        nome,
        email,
        senha,
        confirmarSenha,
        nomeFazenda: fazenda
      }
      
      // Chamar a API de cadastro
      const response = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário')
      }
      
      console.log('Usuário cadastrado com sucesso:', data.usuario)
      
      // Aguardar um pouco antes de redirecionar
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para a página de sucesso
      router.push('/auth/cadastro-sucesso')
      
    } catch (error: any) {
      console.error('Erro ao realizar cadastro:', error)
      setErro(error.message || 'Erro ao realizar cadastro. Tente novamente.')
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
        
        {/* Card de cadastro */}
        <div className={`bg-white rounded-xl shadow-xl p-8 transform transition-all duration-700 ${animacaoConcluida ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Criar Conta</h2>
          <p className="text-gray-600 text-center mb-6">Preencha os dados para começar a utilizar o sistema</p>
          
          {/* Indicador de etapas */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${etapa === 1 ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${etapa === 1 ? 'bg-gray-200' : 'bg-primary-600'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${etapa === 2 ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'}`}>
              2
            </div>
          </div>
          
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 animate-fadeIn">
              <p>{erro}</p>
            </div>
          )}
          
          <form onSubmit={realizarCadastro}>
            {etapa === 1 ? (
              /* Etapa 1: Informações pessoais */
              <div className="animate-fadeIn">
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      id="nome"
                      type="text"
                      className={`input-field pl-10 ${errors.nome ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Seu email de acesso"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="fazenda" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Fazenda
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input
                      id="fazenda"
                      type="text"
                      className={`input-field pl-10 ${errors.fazenda ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Nome da sua fazenda"
                      value={fazenda}
                      onChange={(e) => setFazenda(e.target.value)}
                    />
                  </div>
                  {errors.fazenda && <p className="mt-1 text-sm text-red-600">{errors.fazenda}</p>}
                </div>
                
                <button
                  type="button"
                  onClick={avancarEtapa}
                  className="w-full btn-primary py-3 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300"
                >
                  Continuar
                </button>
              </div>
            ) : (
              /* Etapa 2: Senha e Termos */
              <div className="animate-fadeIn">
                <div className="mb-4">
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="senha"
                      type={mostrarSenha ? "text" : "password"}
                      className={`input-field pl-10 pr-10 ${errors.senha ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Crie uma senha segura"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                      {mostrarSenha ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
                  <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 6 caracteres</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmarSenha"
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      className={`input-field pl-10 pr-10 ${errors.confirmarSenha ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Confirme sua senha"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    >
                      {mostrarConfirmarSenha ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    id="aceitarTermos"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={aceitarTermos}
                    onChange={() => setAceitarTermos(!aceitarTermos)}
                  />
                  <label htmlFor="aceitarTermos" className="ml-2 block text-sm text-gray-700">
                    Eu aceito os{' '}
                    <Link 
                      href="/termos-de-uso" 
                      className="text-primary-600 hover:text-primary-800 font-medium hover:underline highlight"
                    >
                      termos de uso
                    </Link>{' '}
                    e a{' '}
                    <Link 
                      href="/politica-de-privacidade" 
                      className="text-primary-600 hover:text-primary-800 font-medium hover:underline highlight"
                    >
                      política de privacidade
                    </Link>
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={voltarEtapa}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <FaArrowLeft className="mr-2" />
                    Voltar
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 btn-primary py-3 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={carregando}
                  >
                    {carregando ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        <span>Cadastrando...</span>
                      </>
                    ) : (
                      <span>Criar Conta</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link 
                href="/auth/login" 
                className="text-primary-600 hover:text-primary-800 font-medium hover:underline highlight"
              >
                Fazer login
              </Link>
            </p>
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