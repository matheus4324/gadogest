'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPlus, FaFilter, FaCalendarAlt, FaSyringe, FaBriefcaseMedical, FaTrash, FaTimes } from 'react-icons/fa'

// Tipo de dados para os registros de saúde
type RegistroSaude = {
  _id: string
  animal: {
    _id: string
    identificacao: string
    tipo: string
    raca: string
  }
  tipo: string
  data: string
  produto?: string
  dosagem?: string
  aplicador: string
  veterinario?: string
  observacoes?: string
  status: string
  proximaAplicacao?: string
  dataCadastro: string
}

export default function GerenciamentoSaude() {
  const [registros, setRegistros] = useState<RegistroSaude[]>([])
  const [resumo, setResumo] = useState({
    total: 0,
    realizados: 0,
    agendados: 0,
    proximosVencimentos: 0
  })
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState({
    tipo: '',
    status: '',
    dataInicio: '',
    dataFim: '',
    animal: ''
  })
  const [animais, setAnimais] = useState([
    { _id: '101', identificacao: 'BOV-2023-001', tipo: 'Boi', raca: 'Nelore' },
    { _id: '102', identificacao: 'BOV-2023-005', tipo: 'Vaca', raca: 'Gir' },
    { _id: '103', identificacao: 'BOV-2023-010', tipo: 'Bezerro', raca: 'Nelore' },
    { _id: '104', identificacao: 'BOV-2023-012', tipo: 'Vaca', raca: 'Holandesa' },
  ])
  const [erro, setErro] = useState('')
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const router = useRouter()

  // Função para carregar os registros (simulada)
  const carregarRegistros = async () => {
    try {
      setCarregando(true)
      setErro('')
      
      // Em um cenário real, isso seria uma chamada à API
      // const resposta = await fetch('/api/saude?' + new URLSearchParams({
      //   ...filtro,
      //   limite: '100'
      // }))
      
      // if (!resposta.ok) {
      //   throw new Error('Falha ao carregar registros de saúde')
      // }
      
      // const dados = await resposta.json()
      // setRegistros(dados.dados)
      // setResumo(dados.resumo)
      
      // Dados simulados para demonstração
      setTimeout(() => {
        const dadosSimulados: RegistroSaude[] = [
          {
            _id: '1',
            animal: {
              _id: '101',
              identificacao: 'BOV-2023-001',
              tipo: 'Boi',
              raca: 'Nelore'
            },
            tipo: 'Vacinação',
            data: '2023-10-15',
            produto: 'Vacina Febre Aftosa',
            dosagem: '5ml',
            aplicador: 'João Silva',
            veterinario: 'Dr. Carlos Mendes',
            observacoes: 'Animal sem reações adversas.',
            status: 'Realizado',
            dataCadastro: '2023-10-15'
          },
          {
            _id: '2',
            animal: {
              _id: '102',
              identificacao: 'BOV-2023-005',
              tipo: 'Vaca',
              raca: 'Gir'
            },
            tipo: 'Medicação',
            data: '2023-10-10',
            produto: 'Antibiótico XYZ',
            dosagem: '10ml',
            aplicador: 'Maria Oliveira',
            status: 'Realizado',
            dataCadastro: '2023-10-10'
          },
          {
            _id: '3',
            animal: {
              _id: '103',
              identificacao: 'BOV-2023-010',
              tipo: 'Bezerro',
              raca: 'Nelore'
            },
            tipo: 'Exame',
            data: '2023-11-05',
            aplicador: 'Carlos Santos',
            veterinario: 'Dra. Ana Pereira',
            status: 'Agendado',
            dataCadastro: '2023-10-20',
            proximaAplicacao: '2023-11-05'
          },
          {
            _id: '4',
            animal: {
              _id: '104',
              identificacao: 'BOV-2023-012',
              tipo: 'Vaca',
              raca: 'Holandesa'
            },
            tipo: 'Vacinação',
            data: '2023-11-10',
            produto: 'Vacina Brucelose',
            dosagem: '3ml',
            aplicador: 'Roberto Souza',
            status: 'Agendado',
            dataCadastro: '2023-10-22',
            proximaAplicacao: '2023-11-10'
          }
        ]
        
        // Calcular o resumo
        const resumoCalculado = {
          total: dadosSimulados.length,
          realizados: dadosSimulados.filter(r => r.status === 'Realizado').length,
          agendados: dadosSimulados.filter(r => r.status === 'Agendado').length,
          proximosVencimentos: dadosSimulados.filter(r => {
            if (!r.proximaAplicacao) return false
            const dataProx = new Date(r.proximaAplicacao)
            const hoje = new Date()
            const diffDias = Math.ceil((dataProx.getTime() - hoje.getTime()) / (1000 * 3600 * 24))
            return diffDias > 0 && diffDias <= 15
          }).length
        }
        
        setRegistros(dadosSimulados)
        setResumo(resumoCalculado)
        setCarregando(false)
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao carregar registros:', error)
      setErro('Não foi possível carregar os registros de saúde. Tente novamente.')
      setCarregando(false)
    }
  }
  
  // Carregar registros ao iniciar
  useEffect(() => {
    carregarRegistros()
  }, [])
  
  // Função para aplicar filtros
  const aplicarFiltros = (e: React.FormEvent) => {
    e.preventDefault()
    carregarRegistros()
  }
  
  // Função para remover um registro
  const removerRegistro = async (id: string) => {
    try {
      // Em um cenário real, isso seria uma chamada à API
      // const resposta = await fetch(`/api/saude/${id}`, {
      //   method: 'DELETE'
      // })
      
      // if (!resposta.ok) {
      //   throw new Error('Falha ao remover registro')
      // }
      
      // Atualização local (simulada)
      setRegistros(registros.filter(r => r._id !== id))
      
      // Atualizar o resumo
      setResumo({
        ...resumo,
        total: resumo.total - 1,
        realizados: registros.find(r => r._id === id)?.status === 'Realizado' 
          ? resumo.realizados - 1 
          : resumo.realizados,
        agendados: registros.find(r => r._id === id)?.status === 'Agendado' 
          ? resumo.agendados - 1 
          : resumo.agendados
      })
      
    } catch (error) {
      console.error('Erro ao remover registro:', error)
      setErro('Não foi possível remover o registro. Tente novamente.')
    }
  }
  
  // Função para limpar todos os registros
  const limparTodosRegistros = async () => {
    try {
      // Em um cenário real, isso seria uma chamada à API
      // const resposta = await fetch('/api/saude/limpar', {
      //   method: 'DELETE'
      // })
      
      // if (!resposta.ok) {
      //   throw new Error('Falha ao limpar registros')
      // }
      
      // Limpar registros (simulado)
      setRegistros([])
      setResumo({
        total: 0,
        realizados: 0,
        agendados: 0,
        proximosVencimentos: 0
      })
      
      setMostrarConfirmacao(false)
      
    } catch (error) {
      console.error('Erro ao limpar registros:', error)
      setErro('Não foi possível limpar os registros. Tente novamente.')
    }
  }
  
  // Renderizar a tag de status com cores
  const renderizarStatus = (status: string) => {
    switch (status) {
      case 'Realizado':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Realizado</span>
      case 'Agendado':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Agendado</span>
      case 'Cancelado':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Cancelado</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }

  return (
    <div className="animate-fadeIn pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Saúde</h1>
        <div className="flex gap-3">
          <button 
            className="btn-primary flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push('/dashboard/saude/novo')}
          >
            <FaPlus />
            <span>Novo Registro</span>
          </button>
          
          {registros.length > 0 && (
            <button 
              onClick={() => setMostrarConfirmacao(true)} 
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaTrash />
              <span>Limpar Todos</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Confirmar ação</h3>
              <button 
                onClick={() => setMostrarConfirmacao(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <p className="mb-6 text-gray-700">
              Tem certeza que deseja limpar todos os registros de saúde? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={limparTodosRegistros}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Registros</p>
              <p className="text-2xl font-bold text-gray-800">{resumo.total}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <FaBriefcaseMedical className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Procedimentos Realizados</p>
              <p className="text-2xl font-bold text-green-600">{resumo.realizados}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaSyringe className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Procedimentos Agendados</p>
              <p className="text-2xl font-bold text-blue-600">{resumo.agendados}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Próximos Vencimentos</p>
              <p className="text-2xl font-bold text-amber-600">{resumo.proximosVencimentos}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-full">
              <FaCalendarAlt className="text-amber-600 text-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-md shadow-md p-4 mb-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-gray-500" />
          <h2 className="font-medium">Filtros</h2>
        </div>
        
        <form onSubmit={aplicarFiltros} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="tipo"
              className="input-field"
              value={filtro.tipo}
              onChange={(e) => setFiltro({ ...filtro, tipo: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="Vacinação">Vacinação</option>
              <option value="Medicação">Medicação</option>
              <option value="Exame">Exame</option>
              <option value="Cirurgia">Cirurgia</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="input-field"
              value={filtro.status}
              onChange={(e) => setFiltro({ ...filtro, status: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="Realizado">Realizado</option>
              <option value="Agendado">Agendado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="animal" className="block text-sm font-medium text-gray-700 mb-1">
              Animal
            </label>
            <select
              id="animal"
              className="input-field"
              value={filtro.animal}
              onChange={(e) => setFiltro({ ...filtro, animal: e.target.value })}
            >
              <option value="">Todos</option>
              {animais.map((animal) => (
                <option key={animal._id} value={animal._id}>
                  {animal.identificacao} - {animal.tipo}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              id="dataInicio"
              className="input-field"
              value={filtro.dataInicio}
              onChange={(e) => setFiltro({ ...filtro, dataInicio: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-1">
              Data Final
            </label>
            <input
              type="date"
              id="dataFim"
              className="input-field"
              value={filtro.dataFim}
              onChange={(e) => setFiltro({ ...filtro, dataFim: e.target.value })}
            />
          </div>
          
          <div className="md:col-span-5 flex justify-end">
            <button type="submit" className="btn-primary transition-all duration-300 transform hover:scale-105">
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
      
      {/* Lista de Registros */}
      <div className="bg-white rounded-md shadow-md transition-all duration-300 hover:shadow-lg">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 animate-fadeIn">
            {erro}
          </div>
        )}
        
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando registros de saúde...</p>
          </div>
        ) : registros.length === 0 ? (
          <div className="p-8 text-center text-gray-500 animate-fadeIn">
            <p className="mb-4">Nenhum registro de saúde encontrado.</p>
            <button 
              onClick={() => router.push('/dashboard/saude/novo')} 
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-all duration-300"
            >
              <FaPlus className="mr-2" />
              <span>Criar Novo Registro</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Animal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalhes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registros.map((registro) => (
                  <tr key={registro._id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {registro.animal.identificacao}
                      </div>
                      <div className="text-sm text-gray-500">
                        {registro.animal.tipo} - {registro.animal.raca}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registro.tipo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(registro.data).toLocaleDateString('pt-BR')}
                      </div>
                      {registro.proximaAplicacao && (
                        <div className="text-xs text-gray-500">
                          Próx: {new Date(registro.proximaAplicacao).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {registro.produto && `${registro.produto} - `}
                        {registro.dosagem && `${registro.dosagem}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        Aplicador: {registro.aplicador}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderizarStatus(registro.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/dashboard/saude/${registro._id}`} 
                        className="text-primary-600 hover:text-primary-900 mr-4 hover:underline highlight"
                      >
                        Detalhes
                      </Link>
                      <Link 
                        href={`/dashboard/saude/${registro._id}/editar`} 
                        className="text-secondary-600 hover:text-secondary-900 mr-4 hover:underline highlight"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => removerRegistro(registro._id)}
                        className="text-red-600 hover:text-red-900 hover:underline highlight"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 