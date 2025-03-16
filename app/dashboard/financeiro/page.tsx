'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPlus, FaFilter, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaFileInvoiceDollar } from 'react-icons/fa'

// Tipo de dados para os registros financeiros
type RegistroFinanceiro = {
  _id: string
  tipo: 'Receita' | 'Despesa'
  categoria: string
  descricao: string
  valor: number
  data: string
  formaPagamento: string
  status: string
  animal?: {
    _id: string
    identificacao: string
  }
  documentoFiscal?: string
  observacoes?: string
  anexo?: string
}

export default function GerenciamentoFinanceiro() {
  const [registros, setRegistros] = useState<RegistroFinanceiro[]>([])
  const [resumo, setResumo] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0
  })
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState({
    tipo: '',
    categoria: '',
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
      // const resposta = await fetch('/api/financeiro?' + new URLSearchParams({
      //   ...filtro,
      //   limite: '100'
      // }))
      
      // if (!resposta.ok) {
      //   throw new Error('Falha ao carregar registros financeiros')
      // }
      
      // const dados = await resposta.json()
      // setRegistros(dados.dados)
      // setResumo(dados.resumo)
      
      // Dados simulados para demonstração
      setTimeout(() => {
        const dadosSimulados: RegistroFinanceiro[] = [
          {
            _id: '1',
            tipo: 'Receita',
            categoria: 'Venda de Animais',
            descricao: 'Venda de 5 bezerros',
            valor: 15000,
            data: '2023-10-15',
            formaPagamento: 'Transferência',
            status: 'Pago',
            observacoes: 'Venda para Fazenda Bela Vista'
          },
          {
            _id: '2',
            tipo: 'Despesa',
            categoria: 'Alimentação',
            descricao: 'Compra de ração',
            valor: 3200,
            data: '2023-10-10',
            formaPagamento: 'Boleto',
            status: 'Pago',
            documentoFiscal: 'NF-5432'
          },
          {
            _id: '3',
            tipo: 'Despesa',
            categoria: 'Medicamentos',
            descricao: 'Vacinas e antibióticos',
            valor: 1850.50,
            data: '2023-10-05',
            formaPagamento: 'Cartão de Crédito',
            status: 'Pago',
            documentoFiscal: 'NF-2345',
            animal: {
              _id: '101',
              identificacao: 'BOV-2023-001'
            }
          },
          {
            _id: '4',
            tipo: 'Receita',
            categoria: 'Venda de Leite',
            descricao: 'Entrega mensal de outubro',
            valor: 8750,
            data: '2023-10-30',
            formaPagamento: 'Transferência',
            status: 'Pago'
          },
          {
            _id: '5',
            tipo: 'Despesa',
            categoria: 'Mão de Obra',
            descricao: 'Pagamento de funcionários',
            valor: 7500,
            data: '2023-10-05',
            formaPagamento: 'Transferência',
            status: 'Pago'
          }
        ]

        // Calcular resumo
        const totalReceitas = dadosSimulados
          .filter(r => r.tipo === 'Receita')
          .reduce((total, r) => total + r.valor, 0)
        
        const totalDespesas = dadosSimulados
          .filter(r => r.tipo === 'Despesa')
          .reduce((total, r) => total + r.valor, 0)
          
        setRegistros(dadosSimulados)
        setResumo({
          receitas: totalReceitas,
          despesas: totalDespesas,
          saldo: totalReceitas - totalDespesas
        })
        setCarregando(false)
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao carregar registros:', error)
      setErro('Não foi possível carregar os registros financeiros. Tente novamente.')
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
      case 'Pago':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Pago</span>
      case 'Pendente':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pendente</span>
      case 'Cancelado':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Cancelado</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }
  
  // Renderizar ícone para o tipo
  const renderizarIconeTipo = (tipo: 'Receita' | 'Despesa') => {
    switch (tipo) {
      case 'Receita':
        return <FaArrowUp className="text-green-600" />
      case 'Despesa':
        return <FaArrowDown className="text-red-600" />
      default:
        return <FaMoneyBillWave className="text-gray-600" />
    }
  }
  
  // Formatar valor monetário
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento Financeiro</h1>
        <div className="flex gap-3">
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => router.push('/dashboard/financeiro/novo?tipo=receita')}
          >
            <FaPlus />
            <span>Receita</span>
          </button>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center gap-2"
            onClick={() => router.push('/dashboard/financeiro/novo?tipo=despesa')}
          >
            <FaPlus />
            <span>Despesa</span>
          </button>
        </div>
      </div>
      
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Receitas</p>
              <p className="text-2xl font-bold text-green-600">{formatarValor(resumo.receitas)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaArrowUp className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Despesas</p>
              <p className="text-2xl font-bold text-red-600">{formatarValor(resumo.despesas)}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaArrowDown className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo</p>
              <p className={`text-2xl font-bold ${resumo.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatarValor(resumo.saldo)}
              </p>
            </div>
            <div className={`p-3 ${resumo.saldo >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-full`}>
              <FaMoneyBillWave className={`${resumo.saldo >= 0 ? 'text-green-600' : 'text-red-600'} text-xl`} />
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
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              id="categoria"
              className="input-field"
              value={filtro.categoria}
              onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}
            >
              <option value="">Todas</option>
              <option value="Venda de Animais">Venda de Animais</option>
              <option value="Venda de Leite">Venda de Leite</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Medicamentos">Medicamentos</option>
              <option value="Mão de Obra">Mão de Obra</option>
              <option value="Outros">Outros</option>
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
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
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
            Carregando registros financeiros...
          </div>
        ) : registros.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum registro financeiro encontrado. Crie um novo registro clicando nos botões "Receita" ou "Despesa".
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
                    Descrição
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
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
                        <span className={`text-sm font-medium ${registro.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                          {registro.tipo}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{registro.descricao}</div>
                      {registro.animal && (
                        <div className="text-xs text-gray-500">
                          Animal: {registro.animal.identificacao}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registro.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${registro.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatarValor(registro.valor)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(registro.data).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderizarStatus(registro.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/financeiro/${registro._id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                        Detalhes
                      </Link>
                      <Link href={`/dashboard/financeiro/${registro._id}/editar`} className="text-secondary-600 hover:text-secondary-900">
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