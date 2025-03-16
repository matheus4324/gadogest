'use client'

import { useState, useEffect } from 'react'
import { 
  FaUserEdit, FaLock, FaEnvelope, FaBuilding, 
  FaIdCard, FaEye, FaEyeSlash, FaCamera, FaHistory, 
  FaCheck, FaExclamationTriangle
} from 'react-icons/fa'

// Tipo para o perfil do usuário
type PerfilUsuario = {
  _id: string
  nome: string
  email: string
  fazenda: string
  cargo: string
  foto: string | null
  telefone: string
  dataCadastro: string
  ultimoAcesso: string
  acessosRecentes: Array<{
    data: string
    ip: string
    dispositivo: string
  }>
}

export default function PerfilUsuario() {
  // Estado do perfil
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState<'dados' | 'senha' | 'atividade'>('dados')
  
  // Estados de formulário para dados pessoais
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('')
  
  // Estados para alteração de senha
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false)
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
  
  // Estados de mensagem
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [erroFormulario, setErroFormulario] = useState('')
  
  // Carregar dados do perfil (simulação)
  const carregarPerfil = async () => {
    setCarregando(true)
    setErro('')
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Dados simulados para demonstração
      const perfilSimulado: PerfilUsuario = {
        _id: '1',
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        fazenda: 'Fazenda Modelo',
        cargo: 'Gerente de Produção',
        foto: null,
        telefone: '(11) 98765-4321',
        dataCadastro: '2023-01-15T08:30:00Z',
        ultimoAcesso: '2023-08-15T14:25:00Z',
        acessosRecentes: [
          {
            data: '2023-08-15T14:25:00Z',
            ip: '192.168.1.1',
            dispositivo: 'Chrome em Windows'
          },
          {
            data: '2023-08-14T09:12:00Z',
            ip: '192.168.1.1',
            dispositivo: 'Chrome em Windows'
          },
          {
            data: '2023-08-13T16:45:00Z',
            ip: '192.168.0.5',
            dispositivo: 'Safari em iPhone'
          },
          {
            data: '2023-08-10T11:30:00Z',
            ip: '192.168.1.1',
            dispositivo: 'Chrome em Windows'
          }
        ]
      }
      
      // Configurar os estados com os dados do perfil
      setPerfil(perfilSimulado)
      setNome(perfilSimulado.nome)
      setEmail(perfilSimulado.email)
      setTelefone(perfilSimulado.telefone)
      setCargo(perfilSimulado.cargo)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      setErro('Não foi possível carregar os dados do perfil. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }
  
  // Carregar dados iniciais
  useEffect(() => {
    carregarPerfil()
  }, [])
  
  // Atualizar dados pessoais
  const atualizarDadosPessoais = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação simples
    if (!nome.trim() || !email.trim()) {
      setErroFormulario('Nome e email são obrigatórios')
      return
    }
    
    try {
      setErroFormulario('')
      setMensagemSucesso('')
      setSalvando(true)
      
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Atualizar dados localmente (em produção seria após sucesso da API)
      if (perfil) {
        const perfilAtualizado = {
          ...perfil,
          nome,
          email,
          telefone,
          cargo
        }
        
        setPerfil(perfilAtualizado)
        setMensagemSucesso('Dados atualizados com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      setErroFormulario('Erro ao atualizar dados. Tente novamente.')
    } finally {
      setSalvando(false)
      
      // Limpar mensagem de sucesso após 5 segundos
      if (mensagemSucesso) {
        setTimeout(() => setMensagemSucesso(''), 5000)
      }
    }
  }
  
  // Atualizar senha
  const atualizarSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErroFormulario('Todos os campos são obrigatórios')
      return
    }
    
    if (novaSenha.length < 6) {
      setErroFormulario('A nova senha deve ter pelo menos 6 caracteres')
      return
    }
    
    if (novaSenha !== confirmarSenha) {
      setErroFormulario('A confirmação da senha não coincide')
      return
    }
    
    try {
      setErroFormulario('')
      setMensagemSucesso('')
      setSalvando(true)
      
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Limpar campos após atualização bem-sucedida
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmarSenha('')
      
      setMensagemSucesso('Senha atualizada com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)
      setErroFormulario('Erro ao atualizar senha. Verifique se a senha atual está correta.')
    } finally {
      setSalvando(false)
      
      // Limpar mensagem de sucesso após 5 segundos
      if (mensagemSucesso) {
        setTimeout(() => setMensagemSucesso(''), 5000)
      }
    }
  }
  
  // Formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data)
  }
  
  // Renderizar iniciais para a foto
  const renderizarIniciais = (nome: string) => {
    const partes = nome.split(' ')
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase()
    }
    return nome.substring(0, 2).toUpperCase()
  }
  
  // Caso esteja carregando
  if (carregando && !perfil) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600">Carregando informações do perfil...</p>
          </div>
        </div>
      </div>
    )
  }
  
  // Caso ocorra erro
  if (erro) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar perfil</h2>
            <p className="text-gray-600 mb-6">{erro}</p>
            <button
              onClick={carregarPerfil}
              className="btn-primary px-4 py-2"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 pb-8 animate-fadeIn">
      {/* Cabeçalho do Perfil */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Foto/Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-700 overflow-hidden">
              {perfil?.foto ? (
                <img 
                  src={perfil.foto} 
                  alt={perfil.nome} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span>{renderizarIniciais(perfil?.nome || "")}</span>
              )}
            </div>
            <button 
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-primary-600 hover:text-primary-800 transition-colors"
              title="Alterar foto"
            >
              <FaCamera size={14} />
            </button>
          </div>
          
          {/* Informações Básicas */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{perfil?.nome}</h1>
            <p className="text-gray-600">{perfil?.email}</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                <FaBuilding className="mr-1" /> {perfil?.fazenda}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <FaIdCard className="mr-1" /> {perfil?.cargo}
              </span>
            </div>
          </div>
          
          {/* Informações de Acesso */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm w-full md:w-auto">
            <div className="mb-2">
              <span className="text-gray-500">Último acesso:</span>
              <span className="ml-2 font-medium">{perfil?.ultimoAcesso ? formatarData(perfil.ultimoAcesso) : "-"}</span>
            </div>
            <div>
              <span className="text-gray-500">Membro desde:</span>
              <span className="ml-2 font-medium">{perfil?.dataCadastro ? formatarData(perfil.dataCadastro) : "-"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none ${
              abaAtiva === 'dados' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setAbaAtiva('dados')}
          >
            <FaUserEdit className="inline mr-2" /> Dados Pessoais
          </button>
          
          <button
            className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none ${
              abaAtiva === 'senha' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setAbaAtiva('senha')}
          >
            <FaLock className="inline mr-2" /> Alterar Senha
          </button>
          
          <button
            className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none ${
              abaAtiva === 'atividade' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setAbaAtiva('atividade')}
          >
            <FaHistory className="inline mr-2" /> Atividade de Login
          </button>
        </div>
        
        <div className="p-6">
          {/* Mensagens de sucesso/erro */}
          {mensagemSucesso && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md animate-fadeIn flex items-center">
              <FaCheck className="mr-2" />
              <p>{mensagemSucesso}</p>
            </div>
          )}
          
          {erroFormulario && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md animate-fadeIn flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <p>{erroFormulario}</p>
            </div>
          )}
          
          {/* Conteúdo da Aba Dados Pessoais */}
          {abaAtiva === 'dados' && (
            <form onSubmit={atualizarDadosPessoais}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className="input-field w-full"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                
                <div>
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
                      className="input-field pl-10 w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    className="input-field w-full"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo
                  </label>
                  <input
                    id="cargo"
                    type="text"
                    className="input-field w-full"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 flex items-center justify-center disabled:opacity-50"
                  disabled={salvando}
                >
                  {salvando ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>Salvar Alterações</span>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Conteúdo da Aba Alterar Senha */}
          {abaAtiva === 'senha' && (
            <form onSubmit={atualizarSenha}>
              <div className="space-y-6 max-w-lg mx-auto">
                <div>
                  <label htmlFor="senhaAtual" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="senhaAtual"
                      type={mostrarSenhaAtual ? "text" : "password"}
                      className="input-field pl-10 pr-10 w-full"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                    >
                      {mostrarSenhaAtual ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="novaSenha"
                      type={mostrarNovaSenha ? "text" : "password"}
                      className="input-field pl-10 pr-10 w-full"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                    >
                      {mostrarNovaSenha ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 6 caracteres</p>
                </div>
                
                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmarSenha"
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      className="input-field pl-10 pr-10 w-full"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
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
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2 flex items-center justify-center disabled:opacity-50"
                    disabled={salvando}
                  >
                    {salvando ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        <span>Atualizando...</span>
                      </>
                    ) : (
                      <span>Atualizar Senha</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Conteúdo da Aba Atividade de Login */}
          {abaAtiva === 'atividade' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Login</h3>
              <div className="overflow-x-auto bg-gray-50 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data/Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Endereço IP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dispositivo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {perfil?.acessosRecentes.map((acesso, index) => (
                      <tr key={index} className={index === 0 ? "bg-green-50" : "hover:bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatarData(acesso.data)}
                          {index === 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Atual
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {acesso.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {acesso.dispositivo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="mt-4 text-sm text-gray-500">
                Este registro mostra os últimos acessos à sua conta. Se você não reconhecer alguma atividade, 
                recomendamos alterar sua senha imediatamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 