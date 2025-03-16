'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaFileAlt, FaDownload, FaPrint, FaChartBar, FaCalendarAlt, FaTrash, FaRedo, FaTimes } from 'react-icons/fa'

// Tipo de dados para os relatórios
type Relatorio = {
  id: string
  nome: string
  descricao: string
  categoria: 'Rebanho' | 'Saúde' | 'Financeiro' | 'Reprodução'
  icone: React.ReactNode
  gerado?: boolean
  dataGeracao?: string
}

export default function Relatorios() {
  const router = useRouter()
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false)
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<string | null>(null)
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const [relatoriosGerados, setRelatoriosGerados] = useState<string[]>([])
  
  // Lista de relatórios disponíveis
  const [relatorios, setRelatorios] = useState<Relatorio[]>([
    {
      id: 'rebanho-geral',
      nome: 'Rebanho Geral',
      descricao: 'Relatório completo do rebanho, com todos os animais cadastrados e suas informações principais.',
      categoria: 'Rebanho',
      icone: <FaFileAlt className="text-primary-600 text-2xl" />
    },
    {
      id: 'rebanho-categoria',
      nome: 'Rebanho por Categoria',
      descricao: 'Relatório do rebanho agrupado por tipo, raça e idade dos animais.',
      categoria: 'Rebanho',
      icone: <FaChartBar className="text-primary-600 text-2xl" />
    },
    {
      id: 'saude-vacinas',
      nome: 'Vacinas e Medicações',
      descricao: 'Relatório de vacinas e medicações aplicadas no período, com histórico por animal.',
      categoria: 'Saúde',
      icone: <FaFileAlt className="text-blue-600 text-2xl" />
    },
    {
      id: 'saude-agenda',
      nome: 'Agenda de Procedimentos',
      descricao: 'Agenda de procedimentos futuros com alertas de vencimento de prazos.',
      categoria: 'Saúde',
      icone: <FaCalendarAlt className="text-blue-600 text-2xl" />
    },
    {
      id: 'financeiro-receitas-despesas',
      nome: 'Receitas e Despesas',
      descricao: 'Relatório financeiro detalhado, com receitas e despesas no período selecionado.',
      categoria: 'Financeiro',
      icone: <FaFileAlt className="text-green-600 text-2xl" />
    },
    {
      id: 'financeiro-lucratividade',
      nome: 'Lucratividade',
      descricao: 'Análise de lucratividade com gráficos e indicadores de desempenho financeiro.',
      categoria: 'Financeiro',
      icone: <FaChartBar className="text-green-600 text-2xl" />
    },
    {
      id: 'reproducao-coberturas',
      nome: 'Coberturas e Gestações',
      descricao: 'Relatório de coberturas realizadas e gestações em andamento.',
      categoria: 'Reprodução',
      icone: <FaFileAlt className="text-red-600 text-2xl" />
    },
    {
      id: 'reproducao-nascimentos',
      nome: 'Nascimentos',
      descricao: 'Relatório de nascimentos no período, com informações sobre progenitores e bezerros.',
      categoria: 'Reprodução',
      icone: <FaFileAlt className="text-red-600 text-2xl" />
    }
  ])
  
  // Filtrar relatórios por categoria
  const relatoriosFiltrados = filtroCategoria 
    ? relatorios.filter(r => r.categoria === filtroCategoria)
    : relatorios
  
  // Função para gerar um relatório (simulada)
  const gerarRelatorio = (id: string, formato: 'pdf' | 'excel' | 'print') => {
    setGerandoRelatorio(true)
    setRelatorioSelecionado(id)
    
    // Simulação de geração de relatório
    setTimeout(() => {
      console.log(`Gerando relatório ${id} no formato ${formato}`)
      
      // Marcar relatório como gerado
      setRelatorios(relatorios.map(rel => 
        rel.id === id 
          ? { 
              ...rel, 
              gerado: true, 
              dataGeracao: new Date().toLocaleDateString('pt-BR') 
            } 
          : rel
      ))
      
      setRelatoriosGerados(prev => [...prev, id])
      setGerandoRelatorio(false)
      setRelatorioSelecionado(null)
      
      // Em um cenário real, aqui seria feita uma requisição para gerar o relatório
      // e depois o download seria iniciado ou o relatório seria aberto em uma nova aba
      
      // Exemplo:
      // window.open(`/api/relatorios/${id}?formato=${formato}`, '_blank')
      
      // Ou para download:
      // const link = document.createElement('a')
      // link.href = `/api/relatorios/${id}?formato=${formato}`
      // link.download = `relatorio-${id}.${formato}`
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    }, 2000)
  }
  
  // Remover um relatório
  const removerRelatorio = (id: string) => {
    setRelatorios(relatorios.map(rel => 
      rel.id === id 
        ? { ...rel, gerado: false, dataGeracao: undefined } 
        : rel
    ))
    
    setRelatoriosGerados(prev => prev.filter(relId => relId !== id))
  }
  
  // Limpar todos os relatórios
  const limparTodosRelatorios = () => {
    setRelatorios(relatorios.map(rel => ({ ...rel, gerado: false, dataGeracao: undefined })))
    setRelatoriosGerados([])
    setMostrarConfirmacao(false)
  }
  
  // Obter a cor da categoria
  const getCorCategoria = (categoria: string) => {
    switch (categoria) {
      case 'Rebanho':
        return 'bg-primary-100 text-primary-800'
      case 'Saúde':
        return 'bg-blue-100 text-blue-800'
      case 'Financeiro':
        return 'bg-green-100 text-green-800'
      case 'Reprodução':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 animate-fadeIn">Relatórios</h1>
        {relatoriosGerados.length > 0 && (
          <button 
            onClick={() => setMostrarConfirmacao(true)} 
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaTrash />
            <span>Limpar Relatórios</span>
          </button>
        )}
      </div>
      
      {/* Filtros */}
      <div className="mb-6 bg-white p-4 rounded-md shadow-md flex flex-wrap items-center gap-4 transition-all duration-300 hover:shadow-lg">
        <div className="font-medium">Filtrar por:</div>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${filtroCategoria === '' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            onClick={() => setFiltroCategoria('')}
          >
            Todos
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${filtroCategoria === 'Rebanho' ? 'bg-primary-600 text-white' : 'bg-primary-100 hover:bg-primary-200 text-primary-800'}`}
            onClick={() => setFiltroCategoria('Rebanho')}
          >
            Rebanho
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${filtroCategoria === 'Saúde' ? 'bg-blue-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
            onClick={() => setFiltroCategoria('Saúde')}
          >
            Saúde
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${filtroCategoria === 'Financeiro' ? 'bg-green-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800'}`}
            onClick={() => setFiltroCategoria('Financeiro')}
          >
            Financeiro
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${filtroCategoria === 'Reprodução' ? 'bg-red-600 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
            onClick={() => setFiltroCategoria('Reprodução')}
          >
            Reprodução
          </button>
        </div>
      </div>
      
      {/* Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
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
              Tem certeza que deseja limpar todos os relatórios gerados? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={limparTodosRelatorios}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de Relatórios */}
      {gerandoRelatorio ? (
        <div className="bg-white p-8 rounded-md shadow-md text-center animate-fadeIn">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Gerando relatório, aguarde...</p>
          <p className="text-sm text-gray-500 mt-2">
            Relatório: {relatorios.find(r => r.id === relatorioSelecionado)?.nome}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatoriosFiltrados.map((relatorio) => (
            <div 
              key={relatorio.id} 
              className={`bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${relatoriosGerados.includes(relatorio.id) ? 'border-l-4 border-green-500' : ''}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-md bg-gray-100">
                      {relatorio.icone}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {relatorio.nome}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCorCategoria(relatorio.categoria)}`}>
                        {relatorio.categoria}
                      </span>
                      <p className="mt-2 text-gray-600 text-sm">
                        {relatorio.descricao}
                      </p>
                      
                      {relatoriosGerados.includes(relatorio.id) && (
                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                          <FaFileAlt />
                          <span>Gerado em: {relatorio.dataGeracao || 'hoje'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {relatoriosGerados.includes(relatorio.id) && (
                    <button 
                      onClick={() => removerRelatorio(relatorio.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remover relatório"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
                {relatoriosGerados.includes(relatorio.id) ? (
                  <>
                    <button
                      onClick={() => gerarRelatorio(relatorio.id, 'pdf')}
                      className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm hover:bg-primary-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaRedo className="text-xs" />
                      <span>Regenerar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => gerarRelatorio(relatorio.id, 'pdf')}
                      className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm hover:bg-primary-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaDownload className="text-xs" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => gerarRelatorio(relatorio.id, 'excel')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaDownload className="text-xs" />
                      <span>Excel</span>
                    </button>
                    <button
                      onClick={() => gerarRelatorio(relatorio.id, 'print')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaPrint className="text-xs" />
                      <span>Imprimir</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Mensagem se não houver relatórios */}
      {relatoriosFiltrados.length === 0 && (
        <div className="bg-white p-8 rounded-md shadow-md text-center animate-fadeIn">
          <p className="text-gray-600">Nenhum relatório encontrado para a categoria selecionada.</p>
        </div>
      )}
      
      {/* Relatórios Personalizados */}
      <div className="mt-10 animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Relatórios Personalizados</h2>
        <div className="bg-white rounded-md shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <p className="text-gray-600 mb-4">
            Crie relatórios personalizados combinando diferentes tipos de dados e filtros.
          </p>
          <button
            onClick={() => router.push('/dashboard/relatorios/personalizado')}
            className="btn-primary transition-all duration-300 transform hover:scale-105"
          >
            Criar Relatório Personalizado
          </button>
        </div>
      </div>
      
      {/* CSS para animações */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .transition-all {
          transition-property: all;
        }
        
        .duration-300 {
          transition-duration: 300ms;
        }
        
        .transform {
          transform-origin: center;
        }
        
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\:-translate-y-1:hover {
          transform: translateY(-0.25rem);
        }
      `}</style>
    </div>
  )
} 