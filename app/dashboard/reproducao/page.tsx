'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPlus, FaFilter, FaCalendarAlt, FaBirthdayCake, FaHeart } from 'react-icons/fa'

// Tipo de dados para os registros de reprodução
type RegistroReproducao = {
  _id: string
  tipo: 'Cobertura' | 'Gestação' | 'Nascimento'
  dataEvento: string
  dataPrevista?: string
  femea: {
    _id: string
    identificacao: string
    raca: string
  }
  macho?: {
    _id: string
    identificacao: string
    raca: string
  }
  metodo?: string
  responsavel: string
  status: string
  observacoes?: string
  bezerros?: {
    quantidade: number
    identificacoes?: string[]
  }
}

export default function GerenciamentoReproducao() {
  const [registros, setRegistros] = useState<RegistroReproducao[]>([])
  const [resumo, setResumo] = useState({
    coberturas: 0,
    gestacoes: 0,
    nascimentos: 0,
    bezerrosNascidos: 0
  })
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState({
    tipo: '',
    status: '',
    dataInicio: '',
    dataFim: ''
  })
  const [erro, setErro] = useState('')
  const router = useRouter()

  // Função para carregar os registros (simulada)
  const carregarRegistros = async () => {
    try {
      setCarregando(true)
      setErro('')
      
      // Em um cenário real, isso seria uma chamada à API
      // const resposta = await fetch('/api/reproducao?' + new URLSearchParams({
      //   ...filtro,
      //   limite: '100'
      // }))
      
      // if (!resposta.ok) {
      //   throw new Error('Falha ao carregar registros de reprodução')
      // }
      
      // const dados = await resposta.json()
      // setRegistros(dados.dados)
      // setResumo(dados.resumo)
      
      // Dados simulados para demonstração
      setTimeout(() => {
        const dadosSimulados: RegistroReproducao[] = [
          {
            _id: '1',
            tipo: 'Cobertura',
            dataEvento: '2023-05-10',
            femea: {
              _id: '201',
              identificacao: 'VAC-2021-005',
              raca: 'Nelore'
            },
            macho: {
              _id: '301',
              identificacao: 'TOU-2020-002',
              raca: 'Nelore'
            },
            metodo: 'Natural',
            responsavel: 'João Silva',
            status: 'Confirmada',
            observacoes: 'Cobertura realizada a campo'
          },
          {
            _id: '2',
            tipo: 'Gestação',
            dataEvento: '2023-05-25',
            dataPrevista: '2024-02-25',
            femea: {
              _id: '202',
              identificacao: 'VAC-2021-008',
              raca: 'Gir'
            },
            responsavel: 'Maria Oliveira',
            status: 'Em Andamento',
            observacoes: 'Gestação confirmada por ultrassom'
          },
          {
            _id: '3',
            tipo: 'Nascimento',
            dataEvento: '2023-06-15',
            femea: {
              _id: '203',
              identificacao: 'VAC-2020-012',
              raca: 'Nelore'
            },
            responsavel: 'Carlos Santos',
            status: 'Concluído',
            bezerros: {
              quantidade: 1,
              identificacoes: ['BEZ-2023-045']
            }
          },
          {
            _id: '4',
            tipo: 'Cobertura',
            dataEvento: '2023-07-08',
            femea: {
              _id: '204',
              identificacao: 'VAC-2021-015',
              raca: 'Holandesa'
            },
            macho: {
              _id: '302',
              identificacao: 'TOU-2019-005',
              raca: 'Holandês'
            },
            metodo: 'Inseminação Artificial',
            responsavel: 'Dr. Paulo Ribeiro',
            status: 'Não Confirmada',
            observacoes: 'Primeira tentativa'
          },
          {
            _id: '5',
            tipo: 'Nascimento',
            dataEvento: '2023-08-20',
            femea: {
              _id: '205',
              identificacao: 'VAC-2019-020',
              raca: 'Gir'
            },
            responsavel: 'Roberto Souza',
            status: 'Concluído',
            bezerros: {
              quantidade: 2,
              identificacoes: ['BEZ-2023-048', 'BEZ-2023-049']
            },
            observacoes: 'Parto gemelar sem complicações'
          }
        ]

        // Calcular resumo
        const resumoCalculado = {
          coberturas: dadosSimulados.filter(r => r.tipo === 'Cobertura').length,
          gestacoes: dadosSimulados.filter(r => r.tipo === 'Gestação').length,
          nascimentos: dadosSimulados.filter(r => r.tipo === 'Nascimento').length,
          bezerrosNascidos: dadosSimulados
            .filter(r => r.tipo === 'Nascimento')
            .reduce((total, r) => total + (r.bezerros?.quantidade || 0), 0)
        }
          
        setRegistros(dadosSimulados)
        setResumo(resumoCalculado)
        setCarregando(false)
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao carregar registros:', error)
      setErro('Não foi possível carregar os registros de reprodução. Tente novamente.')
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
  
  // Renderizar a tag de status com cores
  const renderizarStatus = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Confirmada</span>
      case 'Não Confirmada':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Não Confirmada</span>
      case 'Em Andamento':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Em Andamento</span>
      case 'Concluído':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Concluído</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }
  
  // Renderizar ícone para o tipo
  const renderizarIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'Cobertura':
        return <FaHeart className="text-red-600" />
      case 'Gestação':
        return <FaCalendarAlt className="text-blue-600" />
      case 'Nascimento':
        return <FaBirthdayCake className="text-green-600" />
      default:
        return <FaCalendarAlt className="text-gray-600" />
    }
  }
  
  // Formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Reprodução</h1>
        <div className="flex gap-3">
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => router.push('/dashboard/reproducao/novo')}
          >
            <FaPlus />
            <span>Novo Registro</span>
          </button>
        </div>
      </div>
      
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Coberturas</p>
              <p className="text-2xl font-bold text-red-600">{resumo.coberturas}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaHeart className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Gestações</p>
              <p className="text-2xl font-bold text-blue-600">{resumo.gestacoes}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Nascimentos</p>
              <p className="text-2xl font-bold text-green-600">{resumo.nascimentos}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaBirthdayCake className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Bezerros Nascidos</p>
              <p className="text-2xl font-bold text-primary-600">{resumo.bezerrosNascidos}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <FaBirthdayCake className="text-primary-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-md shadow-md p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-gray-500" />
          <h2 className="font-medium">Filtros</h2>
        </div>
        
        <form onSubmit={aplicarFiltros} className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <option value="Cobertura">Cobertura</option>
              <option value="Gestação">Gestação</option>
              <option value="Nascimento">Nascimento</option>
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
              <option value="Confirmada">Confirmada</option>
              <option value="Não Confirmada">Não Confirmada</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
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
          
          <div className="md:col-span-4 flex justify-end">
            <button type="submit" className="btn-primary">
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
      
      {/* Lista de Registros */}
      <div className="bg-white rounded-md shadow-md">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {erro}
          </div>
        )}
        
        {carregando ? (
          <div className="p-8 text-center text-gray-500">
            Carregando registros de reprodução...
          </div>
        ) : registros.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum registro de reprodução encontrado. Crie um novo registro clicando no botão "Novo Registro".
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fêmea
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
                  <tr key={registro._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {renderizarIconeTipo(registro.tipo)}
                        <span className="text-sm font-medium text-gray-900">{registro.tipo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {registro.femea.identificacao}
                      </div>
                      <div className="text-sm text-gray-500">
                        {registro.femea.raca}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatarData(registro.dataEvento)}
                      </div>
                      {registro.dataPrevista && (
                        <div className="text-xs text-gray-500">
                          Prev: {formatarData(registro.dataPrevista)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {registro.tipo === 'Cobertura' && registro.macho && (
                        <div className="text-sm text-gray-900">
                          Touro: {registro.macho.identificacao}
                          <div className="text-xs text-gray-500">
                            Método: {registro.metodo}
                          </div>
                        </div>
                      )}
                      {registro.tipo === 'Nascimento' && registro.bezerros && (
                        <div className="text-sm text-gray-900">
                          {registro.bezerros.quantidade} bezerro(s)
                          <div className="text-xs text-gray-500">
                            {registro.bezerros.identificacoes?.join(', ')}
                          </div>
                        </div>
                      )}
                      {registro.tipo === 'Gestação' && (
                        <div className="text-sm text-gray-500">
                          Responsável: {registro.responsavel}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderizarStatus(registro.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/reproducao/${registro._id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                        Detalhes
                      </Link>
                      <Link href={`/dashboard/reproducao/${registro._id}/editar`} className="text-secondary-600 hover:text-secondary-900">
                        Editar
                      </Link>
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