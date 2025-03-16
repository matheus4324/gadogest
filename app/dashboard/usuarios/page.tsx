'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaLock, 
  FaUserCog, FaFilter, FaUserCheck, FaUserTimes, FaUserShield
} from 'react-icons/fa'

// Tipo para usuário
type Usuario = {
  _id: string
  nome: string
  email: string
  fazenda: string
  perfil: 'admin' | 'gerente' | 'operador' | 'visualizador'
  ativo: boolean
  ultimoAcesso: string | null
  dataCadastro: string
}

export default function GerenciamentoUsuarios() {
  const router = useRouter()
  
  // Estados
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [carregando, setCarregando] = useState(true)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)
  const [modoFormulario, setModoFormulario] = useState<'adicionar' | 'editar' | 'visualizar'>('adicionar')
  
  // Estados de filtro
  const [filtroPerfil, setFiltroPerfil] = useState<string>('')
  const [filtroStatus, setFiltroStatus] = useState<string>('')
  const [filtroBusca, setFiltroBusca] = useState('')
  
  // Função para carregar os usuários (simulação)
  const carregarUsuarios = async () => {
    setCarregando(true)
    
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Dados simulados
      const dadosSimulados: Usuario[] = [
        {
          _id: '1',
          nome: 'Administrador',
          email: 'admin@example.com',
          fazenda: 'Fazenda Modelo',
          perfil: 'admin',
          ativo: true,
          ultimoAcesso: '2023-08-15T10:30:00Z',
          dataCadastro: '2023-01-10T08:00:00Z'
        },
        {
          _id: '2',
          nome: 'Gerente Financeiro',
          email: 'gerente@example.com',
          fazenda: 'Fazenda Modelo',
          perfil: 'gerente',
          ativo: true,
          ultimoAcesso: '2023-08-14T16:45:00Z',
          dataCadastro: '2023-02-15T09:30:00Z'
        },
        {
          _id: '3',
          nome: 'Operador de Campo',
          email: 'operador@example.com',
          fazenda: 'Fazenda Modelo',
          perfil: 'operador',
          ativo: true,
          ultimoAcesso: '2023-08-10T08:20:00Z',
          dataCadastro: '2023-03-05T14:20:00Z'
        },
        {
          _id: '4',
          nome: 'Visualizador de Relatórios',
          email: 'visualizador@example.com',
          fazenda: 'Fazenda Modelo',
          perfil: 'visualizador',
          ativo: false,
          ultimoAcesso: null,
          dataCadastro: '2023-05-20T11:15:00Z'
        },
        {
          _id: '5',
          nome: 'Técnico de Campo',
          email: 'tecnico@example.com',
          fazenda: 'Fazenda Modelo',
          perfil: 'operador',
          ativo: true,
          ultimoAcesso: '2023-08-12T09:45:00Z',
          dataCadastro: '2023-04-12T10:00:00Z'
        }
      ]
      
      setUsuarios(dadosSimulados)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setCarregando(false)
    }
  }
  
  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarUsuarios()
  }, [])
  
  // Função para filtrar usuários
  const usuariosFiltrados = usuarios.filter(usuario => {
    // Filtrar por busca (nome ou email)
    const termoBuscaMatch = 
      usuario.nome.toLowerCase().includes(filtroBusca.toLowerCase()) || 
      usuario.email.toLowerCase().includes(filtroBusca.toLowerCase())
    
    // Filtrar por perfil
    const perfilMatch = filtroPerfil ? usuario.perfil === filtroPerfil : true
    
    // Filtrar por status
    const statusMatch = 
      filtroStatus === 'ativo' ? usuario.ativo : 
      filtroStatus === 'inativo' ? !usuario.ativo : 
      true
    
    return termoBuscaMatch && perfilMatch && statusMatch
  })
  
  // Funções de gerenciamento
  const adicionarUsuario = () => {
    setModoFormulario('adicionar')
    setUsuarioSelecionado(null)
    setModalAberto(true)
  }
  
  const editarUsuario = (usuario: Usuario) => {
    setModoFormulario('editar')
    setUsuarioSelecionado(usuario)
    setModalAberto(true)
  }
  
  const visualizarUsuario = (usuario: Usuario) => {
    setModoFormulario('visualizar')
    setUsuarioSelecionado(usuario)
    setModalAberto(true)
  }
  
  const confirmarExclusao = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario)
    setConfirmacaoAberta(true)
  }
  
  const excluirUsuario = async () => {
    if (!usuarioSelecionado) return
    
    // Simulação de exclusão
    setCarregando(true)
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Atualizar estado removendo o usuário
      setUsuarios(usuarios.filter(u => u._id !== usuarioSelecionado._id))
      
      // Fechar modal de confirmação
      setConfirmacaoAberta(false)
      setUsuarioSelecionado(null)
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
    } finally {
      setCarregando(false)
    }
  }
  
  // Função para alternar status do usuário
  const alternarStatusUsuario = async (usuario: Usuario) => {
    setCarregando(true)
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Atualizar estado localmente
      setUsuarios(
        usuarios.map(u => 
          u._id === usuario._id ? { ...u, ativo: !u.ativo } : u
        )
      )
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error)
    } finally {
      setCarregando(false)
    }
  }
  
  // Função para resetar senha (simulada)
  const resetarSenha = async (usuario: Usuario) => {
    // Em um ambiente real, isso enviaria um e-mail com link para resetar senha
    alert(`Um e-mail com instruções para resetar a senha foi enviado para ${usuario.email}`)
  }
  
  // Formatar data
  const formatarData = (dataString: string | null) => {
    if (!dataString) return 'Nunca acessou'
    
    const data = new Date(dataString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data)
  }
  
  // Renderizar ícone de perfil
  const renderizarIconePerfil = (perfil: Usuario['perfil']) => {
    switch (perfil) {
      case 'admin':
        return <FaUserShield className="text-red-600" title="Administrador" />
      case 'gerente':
        return <FaUserCog className="text-blue-600" title="Gerente" />
      case 'operador':
        return <FaUserCheck className="text-green-600" title="Operador" />
      case 'visualizador':
        return <FaUserTimes className="text-gray-600" title="Visualizador" />
      default:
        return null
    }
  }
  
  // Traduzir perfil para português
  const traduzirPerfil = (perfil: Usuario['perfil']) => {
    const traducoes = {
      admin: 'Administrador',
      gerente: 'Gerente',
      operador: 'Operador',
      visualizador: 'Visualizador'
    }
    
    return traducoes[perfil] || perfil
  }
  
  return (
    <div className="container px-4 mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUserCog className="mr-2 text-primary-600" />
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-600 mt-1">
              Administre os usuários que têm acesso ao sistema
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={adicionarUsuario}
              className="btn-primary px-4 py-2 flex items-center"
              disabled={carregando}
            >
              <FaPlus className="mr-2" />
              Novo Usuário
            </button>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                className="input-field pl-10 w-full"
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <FaFilter className={`mr-2 ${mostrarFiltros ? 'text-primary-600' : 'text-gray-500'}`} />
              <span>Filtros</span>
              <span className="ml-2 flex items-center justify-center w-5 h-5 bg-gray-100 text-xs rounded-full">
                {(filtroPerfil ? 1 : 0) + (filtroStatus ? 1 : 0)}
              </span>
            </button>
            
            <button
              onClick={() => {
                setFiltroBusca('')
                setFiltroPerfil('')
                setFiltroStatus('')
              }}
              className="text-sm text-primary-600 hover:text-primary-800 hover:underline flex items-center"
            >
              Limpar filtros
            </button>
          </div>
          
          {mostrarFiltros && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-md animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Perfil de Usuário
                </label>
                <select
                  value={filtroPerfil}
                  onChange={(e) => setFiltroPerfil(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">Todos os perfis</option>
                  <option value="admin">Administrador</option>
                  <option value="gerente">Gerente</option>
                  <option value="operador">Operador</option>
                  <option value="visualizador">Visualizador</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">Todos os status</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Tabela de Usuários */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perfil
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acesso
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {carregando && usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                    <p className="mt-2 text-gray-500">Carregando usuários...</p>
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-4 text-center">
                    <p className="text-gray-500">Nenhum usuário encontrado.</p>
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold uppercase">
                          {usuario.nome.substring(0, 2)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{usuario.nome}</div>
                          <div className="text-sm text-gray-500">{usuario.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {renderizarIconePerfil(usuario.perfil)}
                        <span className="ml-2 text-sm text-gray-900">
                          {traduzirPerfil(usuario.perfil)}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          usuario.ativo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {formatarData(usuario.ultimoAcesso)}
                    </td>
                    
                    <td className="py-4 px-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => visualizarUsuario(usuario)}
                          className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded"
                          title="Visualizar detalhes"
                        >
                          <FaEye />
                        </button>
                        
                        <button
                          onClick={() => editarUsuario(usuario)}
                          className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                          title="Editar usuário"
                        >
                          <FaEdit />
                        </button>
                        
                        <button
                          onClick={() => resetarSenha(usuario)}
                          className="text-yellow-500 hover:text-yellow-700 p-1 hover:bg-yellow-50 rounded"
                          title="Resetar senha"
                        >
                          <FaLock />
                        </button>
                        
                        <button
                          onClick={() => alternarStatusUsuario(usuario)}
                          className={`p-1 rounded ${
                            usuario.ativo
                              ? 'text-red-500 hover:text-red-700 hover:bg-red-50'
                              : 'text-green-500 hover:text-green-700 hover:bg-green-50'
                          }`}
                          title={usuario.ativo ? 'Desativar usuário' : 'Ativar usuário'}
                        >
                          {usuario.ativo ? <FaUserTimes /> : <FaUserCheck />}
                        </button>
                        
                        <button
                          onClick={() => confirmarExclusao(usuario)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                          title="Excluir usuário"
                          disabled={usuario.perfil === 'admin'}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Estatísticas */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-800 text-lg font-semibold">{usuarios.length}</div>
              <div className="text-blue-600 text-sm">Total de Usuários</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-green-800 text-lg font-semibold">
                {usuarios.filter(u => u.ativo).length}
              </div>
              <div className="text-green-600 text-sm">Usuários Ativos</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-yellow-800 text-lg font-semibold">
                {usuarios.filter(u => u.perfil === 'admin').length}
              </div>
              <div className="text-yellow-600 text-sm">Administradores</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-purple-800 text-lg font-semibold">
                {usuarios.filter(u => new Date(u.dataCadastro) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-purple-600 text-sm">Novos (30 dias)</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmação de exclusão */}
      {confirmacaoAberta && usuarioSelecionado && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-lg max-w-md w-full p-6 mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o usuário <strong>{usuarioSelecionado.nome}</strong>? 
              Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmacaoAberta(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              
              <button
                onClick={excluirUsuario}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para adicionar/editar usuário - implementação simplificada */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 mx-4">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              {modoFormulario === 'adicionar' ? 'Adicionar Novo Usuário' : 
               modoFormulario === 'editar' ? 'Editar Usuário' : 'Detalhes do Usuário'}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {modoFormulario === 'visualizar' 
                ? 'Visualizando detalhes do usuário no sistema.' 
                : 'Preencha os dados do usuário nos campos abaixo.'}
            </p>
            
            {/* Aqui teria o formulário completo, mas para simplificar estamos só mostrando o botão de fechar */}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 