'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'

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
  custo?: number
}

export default function DetalhesRegistroSaude({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [registro, setRegistro] = useState<RegistroSaude | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Carregar dados do registro (simulado)
  useEffect(() => {
    const carregarRegistro = async () => {
      try {
        setCarregando(true)
        setErro('')
        
        // Em um cenário real, isso seria uma chamada à API
        // const resposta = await fetch(`/api/saude/${params.id}`)
        // if (!resposta.ok) {
        //   throw new Error('Não foi possível carregar o registro')
        // }
        // const dados = await resposta.json()
        // setRegistro(dados.registro)
        
        // Dados simulados para demonstração
        setTimeout(() => {
          // Verificar qual ID foi solicitado
          const registroSimulado: RegistroSaude = {
            _id: params.id,
            animal: {
              _id: '101',
              identificacao: 'BOV-2023-001',
              tipo: 'Boi',
              raca: 'Nelore'
            },
            tipo: 'Vacinação',
            data: '2023-09-15',
            produto: 'Vacina Febre Aftosa',
            dosagem: '5ml',
            aplicador: 'João Silva',
            veterinario: 'Dr. Carlos Mendes',
            observacoes: 'Animal sem reações adversas. Aplicação realizada no período da manhã, com contenção adequada do animal. Não houve intercorrências durante o procedimento.',
            status: 'Realizado',
            dataCadastro: '2023-09-15',
            custo: 45.90
          }
          
          setRegistro(registroSimulado)
          setCarregando(false)
        }, 1000)
        
      } catch (error) {
        console.error('Erro ao carregar registro:', error)
        setErro('Não foi possível carregar os detalhes do registro')
        setCarregando(false)
      }
    }
    
    carregarRegistro()
  }, [params.id])
  
  // Renderizar a tag de status com cores
  const renderizarStatus = (status: string) => {
    switch (status) {
      case 'Realizado':
        return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Realizado</span>
      case 'Agendado':
        return <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Agendado</span>
      case 'Cancelado':
        return <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">Cancelado</span>
      default:
        return <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">{status}</span>
    }
  }
  
  // Formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR')
  }
  
  // Formatar valor monetário
  const formatarValor = (valor?: number) => {
    if (valor === undefined) return '-'
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    })
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Carregando detalhes do registro...</p>
      </div>
    )
  }
  
  if (erro) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{erro}</p>
        <button 
          onClick={() => router.back()}
          className="mt-4 text-sm text-red-600 hover:text-red-800"
        >
          Voltar
        </button>
      </div>
    )
  }
  
  if (!registro) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
        <p>Registro não encontrado</p>
        <Link href="/dashboard/saude" className="mt-4 text-sm text-yellow-600 hover:text-yellow-800">
          Voltar para lista
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Detalhes do Registro de Saúde</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <FaArrowLeft />
            <span>Voltar</span>
          </button>
          <Link 
            href={`/dashboard/saude/${params.id}/editar`}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors"
          >
            <FaPencilAlt />
            <span>Editar</span>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-primary-50 p-6 border-b border-primary-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {registro.tipo}: {registro.animal.identificacao}
              </h2>
              <p className="text-gray-600 mt-1">
                {registro.animal.tipo} - {registro.animal.raca}
              </p>
            </div>
            <div className="text-right">
              <div className="mb-2">{renderizarStatus(registro.status)}</div>
              <p className="text-sm text-gray-600">
                Data: {formatarData(registro.data)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Informações do Procedimento</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Procedimento</p>
                  <p className="text-base">{registro.tipo}</p>
                </div>
                
                {registro.produto && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Produto/Medicamento</p>
                    <p className="text-base">{registro.produto}</p>
                  </div>
                )}
                
                {registro.dosagem && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dosagem</p>
                    <p className="text-base">{registro.dosagem}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Aplicador</p>
                  <p className="text-base">{registro.aplicador}</p>
                </div>
                
                {registro.veterinario && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Veterinário</p>
                    <p className="text-base">{registro.veterinario}</p>
                  </div>
                )}
                
                {registro.custo !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Custo</p>
                    <p className="text-base">{formatarValor(registro.custo)}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Datas e Observações</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Data do Procedimento</p>
                  <p className="text-base">{formatarData(registro.data)}</p>
                </div>
                
                {registro.proximaAplicacao && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Próxima Aplicação</p>
                    <p className="text-base">{formatarData(registro.proximaAplicacao)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Data de Cadastro</p>
                  <p className="text-base">{formatarData(registro.dataCadastro)}</p>
                </div>
                
                {registro.observacoes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Observações</p>
                    <p className="text-base bg-gray-50 p-3 rounded-md">{registro.observacoes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 