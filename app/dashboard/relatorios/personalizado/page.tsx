'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave, FaPlus, FaTimes, FaChartBar } from 'react-icons/fa'

type CampoRelatorio = {
  id: string
  nome: string
  tipo: 'texto' | 'numero' | 'data' | 'selecao'
  categoria: 'Rebanho' | 'Saúde' | 'Financeiro' | 'Reprodução'
  descricao: string
  selecionado: boolean
}

type FiltroRelatorio = {
  id: string
  campo: string
  operador: string
  valor: string
}

export default function RelatorioPersonalizado() {
  const router = useRouter()
  const [nomeRelatorio, setNomeRelatorio] = useState('')
  const [descricaoRelatorio, setDescricaoRelatorio] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null)
  const [campos, setCampos] = useState<CampoRelatorio[]>([
    // Campos de Rebanho
    { id: 'rebanho_identificacao', nome: 'Identificação', tipo: 'texto', categoria: 'Rebanho', descricao: 'Número de identificação do animal', selecionado: false },
    { id: 'rebanho_tipo', nome: 'Tipo', tipo: 'selecao', categoria: 'Rebanho', descricao: 'Tipo do animal (boi, vaca, bezerro, etc)', selecionado: false },
    { id: 'rebanho_raca', nome: 'Raça', tipo: 'texto', categoria: 'Rebanho', descricao: 'Raça do animal', selecionado: false },
    { id: 'rebanho_dataNascimento', nome: 'Data de Nascimento', tipo: 'data', categoria: 'Rebanho', descricao: 'Data de nascimento do animal', selecionado: false },
    { id: 'rebanho_peso', nome: 'Peso', tipo: 'numero', categoria: 'Rebanho', descricao: 'Peso do animal em kg', selecionado: false },
    { id: 'rebanho_status', nome: 'Status', tipo: 'selecao', categoria: 'Rebanho', descricao: 'Status atual do animal', selecionado: false },
    
    // Campos de Saúde
    { id: 'saude_tipo', nome: 'Tipo de Procedimento', tipo: 'selecao', categoria: 'Saúde', descricao: 'Tipo de procedimento de saúde', selecionado: false },
    { id: 'saude_data', nome: 'Data do Procedimento', tipo: 'data', categoria: 'Saúde', descricao: 'Data em que o procedimento foi realizado', selecionado: false },
    { id: 'saude_produto', nome: 'Produto/Medicamento', tipo: 'texto', categoria: 'Saúde', descricao: 'Produto ou medicamento utilizado', selecionado: false },
    { id: 'saude_aplicador', nome: 'Aplicador', tipo: 'texto', categoria: 'Saúde', descricao: 'Pessoa responsável pela aplicação', selecionado: false },
    { id: 'saude_status', nome: 'Status', tipo: 'selecao', categoria: 'Saúde', descricao: 'Status do procedimento', selecionado: false },
    
    // Campos de Financeiro
    { id: 'financeiro_tipo', nome: 'Tipo', tipo: 'selecao', categoria: 'Financeiro', descricao: 'Tipo de registro financeiro (receita/despesa)', selecionado: false },
    { id: 'financeiro_categoria', nome: 'Categoria', tipo: 'selecao', categoria: 'Financeiro', descricao: 'Categoria do registro financeiro', selecionado: false },
    { id: 'financeiro_valor', nome: 'Valor', tipo: 'numero', categoria: 'Financeiro', descricao: 'Valor do registro financeiro', selecionado: false },
    { id: 'financeiro_data', nome: 'Data', tipo: 'data', categoria: 'Financeiro', descricao: 'Data do registro financeiro', selecionado: false },
    { id: 'financeiro_formaPagamento', nome: 'Forma de Pagamento', tipo: 'selecao', categoria: 'Financeiro', descricao: 'Forma de pagamento utilizada', selecionado: false },
    
    // Campos de Reprodução
    { id: 'reproducao_tipo', nome: 'Tipo', tipo: 'selecao', categoria: 'Reprodução', descricao: 'Tipo de registro reprodutivo', selecionado: false },
    { id: 'reproducao_data', nome: 'Data do Evento', tipo: 'data', categoria: 'Reprodução', descricao: 'Data do evento reprodutivo', selecionado: false },
    { id: 'reproducao_femea', nome: 'Fêmea', tipo: 'texto', categoria: 'Reprodução', descricao: 'Identificação da fêmea', selecionado: false },
    { id: 'reproducao_macho', nome: 'Macho', tipo: 'texto', categoria: 'Reprodução', descricao: 'Identificação do macho', selecionado: false },
    { id: 'reproducao_status', nome: 'Status', tipo: 'selecao', categoria: 'Reprodução', descricao: 'Status do registro reprodutivo', selecionado: false }
  ])
  
  const [filtros, setFiltros] = useState<FiltroRelatorio[]>([])
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false)
  
  // Opções para operadores de filtro
  const operadores = {
    texto: ['igual a', 'contém', 'não contém', 'começa com', 'termina com'],
    numero: ['igual a', 'maior que', 'menor que', 'entre'],
    data: ['igual a', 'depois de', 'antes de', 'entre'],
    selecao: ['igual a', 'diferente de']
  }
  
  // Filtrar campos pela categoria selecionada
  const camposFiltrados = categoriaAtiva 
    ? campos.filter(c => c.categoria === categoriaAtiva)
    : campos
  
  // Obter todos os campos selecionados
  const camposSelecionados = campos.filter(c => c.selecionado)
  
  // Adicionar um novo filtro
  const adicionarFiltro = () => {
    if (campos.some(c => c.selecionado)) {
      const primeiroCampo = campos.find(c => c.selecionado)
      if (primeiroCampo) {
        const novoFiltro: FiltroRelatorio = {
          id: `filtro_${Date.now()}`,
          campo: primeiroCampo.id,
          operador: operadores[primeiroCampo.tipo][0],
          valor: ''
        }
        setFiltros([...filtros, novoFiltro])
      }
    }
  }
  
  // Remover um filtro
  const removerFiltro = (id: string) => {
    setFiltros(filtros.filter(f => f.id !== id))
  }
  
  // Atualizar um filtro
  const atualizarFiltro = (id: string, campo: keyof FiltroRelatorio, valor: string) => {
    setFiltros(filtros.map(f => 
      f.id === id 
        ? { ...f, [campo]: valor } 
        : f
    ))
    
    // Se o campo foi alterado, resetar o operador para o primeiro disponível
    if (campo === 'campo') {
      const tipoCampo = campos.find(c => c.id === valor)?.tipo
      if (tipoCampo) {
        setFiltros(filtros.map(f => 
          f.id === id 
            ? { ...f, campo: valor, operador: operadores[tipoCampo][0] } 
            : f
        ))
      }
    }
  }
  
  // Alternar seleção de um campo
  const toggleCampo = (id: string) => {
    setCampos(campos.map(c => 
      c.id === id 
        ? { ...c, selecionado: !c.selecionado } 
        : c
    ))
  }
  
  // Função para gerar o relatório personalizado
  const gerarRelatorio = () => {
    if (camposSelecionados.length === 0) {
      alert('Selecione pelo menos um campo para o relatório')
      return
    }
    
    if (!nomeRelatorio) {
      alert('Informe um nome para o relatório')
      return
    }
    
    setGerandoRelatorio(true)
    
    // Simulação de geração de relatório
    setTimeout(() => {
      console.log('Gerando relatório personalizado', {
        nome: nomeRelatorio,
        descricao: descricaoRelatorio,
        campos: camposSelecionados,
        filtros
      })
      
      setGerandoRelatorio(false)
      router.push('/dashboard/relatorios')
    }, 2000)
  }
  
  // Obter a cor da categoria
  const getCorCategoria = (categoria: string) => {
    switch (categoria) {
      case 'Rebanho':
        return 'bg-primary-100 text-primary-800 border-primary-300'
      case 'Saúde':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Financeiro':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Reprodução':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }
  
  return (
    <div className="animate-fadeIn pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Criar Relatório Personalizado</h1>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>
      </div>
      
      {/* Formulário de cabeçalho */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nomeRelatorio" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Relatório *
            </label>
            <input
              type="text"
              id="nomeRelatorio"
              className="input-field"
              value={nomeRelatorio}
              onChange={(e) => setNomeRelatorio(e.target.value)}
              placeholder="Ex: Relatório de Vacinação Mensal"
            />
          </div>
          
          <div>
            <label htmlFor="descricaoRelatorio" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              id="descricaoRelatorio"
              className="input-field"
              value={descricaoRelatorio}
              onChange={(e) => setDescricaoRelatorio(e.target.value)}
              placeholder="Opcional: breve descrição do relatório"
            />
          </div>
        </div>
      </div>
      
      {/* Seleção de campos */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Campos do Relatório</h2>
        <p className="text-gray-600 text-sm mb-4">
          Selecione os campos que deseja incluir no relatório. Você pode filtrar por categoria para facilitar a seleção.
        </p>
        
        {/* Filtro por categoria */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${!categoriaAtiva ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            onClick={() => setCategoriaAtiva(null)}
          >
            Todos
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${categoriaAtiva === 'Rebanho' ? 'bg-primary-600 text-white' : 'bg-primary-100 hover:bg-primary-200 text-primary-800'}`}
            onClick={() => setCategoriaAtiva('Rebanho')}
          >
            Rebanho
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${categoriaAtiva === 'Saúde' ? 'bg-blue-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
            onClick={() => setCategoriaAtiva('Saúde')}
          >
            Saúde
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${categoriaAtiva === 'Financeiro' ? 'bg-green-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800'}`}
            onClick={() => setCategoriaAtiva('Financeiro')}
          >
            Financeiro
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${categoriaAtiva === 'Reprodução' ? 'bg-red-600 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
            onClick={() => setCategoriaAtiva('Reprodução')}
          >
            Reprodução
          </button>
        </div>
        
        {/* Lista de campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {camposFiltrados.map((campo) => (
            <div 
              key={campo.id} 
              className={`border rounded-md p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                campo.selecionado ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleCampo(campo.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={campo.selecionado}
                      onChange={() => {}}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 font-medium text-gray-800">{campo.nome}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{campo.descricao}</p>
                </div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCorCategoria(campo.categoria)}`}>
                  {campo.categoria}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {camposFiltrados.length === 0 && (
          <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
            Nenhum campo encontrado para a categoria selecionada.
          </div>
        )}
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Filtros (Opcional)</h2>
          <button
            onClick={adicionarFiltro}
            disabled={camposSelecionados.length === 0}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300 transform hover:scale-105 ${
              camposSelecionados.length === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            <FaPlus className="text-xs" />
            <span>Adicionar Filtro</span>
          </button>
        </div>
        
        {filtros.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
            Nenhum filtro adicionado. Clique em "Adicionar Filtro" para criar um novo filtro.
          </div>
        ) : (
          <div className="space-y-4">
            {filtros.map((filtro) => {
              const campoAtual = campos.find(c => c.id === filtro.campo)
              
              return (
                <div key={filtro.id} className="bg-gray-50 p-4 rounded-md relative animate-fadeIn">
                  <button
                    onClick={() => removerFiltro(filtro.id)}
                    className="absolute right-2 top-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTimes />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Campo
                      </label>
                      <select
                        className="input-field"
                        value={filtro.campo}
                        onChange={(e) => atualizarFiltro(filtro.id, 'campo', e.target.value)}
                      >
                        {camposSelecionados.map((campo) => (
                          <option key={campo.id} value={campo.id}>
                            {campo.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Operador
                      </label>
                      <select
                        className="input-field"
                        value={filtro.operador}
                        onChange={(e) => atualizarFiltro(filtro.id, 'operador', e.target.value)}
                      >
                        {campoAtual && operadores[campoAtual.tipo].map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Valor
                      </label>
                      <input
                        type={campoAtual?.tipo === 'data' ? 'date' : campoAtual?.tipo === 'numero' ? 'number' : 'text'}
                        className="input-field"
                        value={filtro.valor}
                        onChange={(e) => atualizarFiltro(filtro.id, 'valor', e.target.value)}
                        placeholder="Digite o valor..."
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
        >
          Cancelar
        </button>
        <button
          onClick={gerarRelatorio}
          disabled={gerandoRelatorio || camposSelecionados.length === 0 || !nomeRelatorio}
          className={`btn-primary flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
            (gerandoRelatorio || camposSelecionados.length === 0 || !nomeRelatorio) 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {gerandoRelatorio ? (
            <>
              <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <FaChartBar />
              <span>Gerar Relatório</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
} 