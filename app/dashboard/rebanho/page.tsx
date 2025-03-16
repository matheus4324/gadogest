'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Dados simulados de animais
const animalMockData: Animal[] = [
  { 
    _id: '001', 
    id: '001',
    identificacao: 'BOV-0001', 
    tipo: 'Boi',
    raca: 'Nelore',
    dataNascimento: '2020-06-12',
    peso: 580,
    status: 'Saudável',
    sexo: 'Macho'
  },
  { 
    _id: '002', 
    id: '002',
    identificacao: 'BOV-0002', 
    tipo: 'Vaca',
    raca: 'Gir',
    dataNascimento: '2019-03-05',
    peso: 450,
    status: 'Saudável',
    sexo: 'Fêmea'
  },
  { 
    _id: '003',
    id: '003', 
    identificacao: 'BOV-0003', 
    tipo: 'Novilho',
    raca: 'Angus',
    dataNascimento: '2021-09-18',
    peso: 320,
    status: 'Em tratamento',
    sexo: 'Macho'
  },
  { 
    _id: '004',
    id: '004', 
    identificacao: 'BOV-0004', 
    tipo: 'Vaca',
    raca: 'Holandesa',
    dataNascimento: '2018-11-22',
    peso: 520,
    status: 'Prenhe',
    sexo: 'Fêmea'
  },
  { 
    _id: '005',
    id: '005', 
    identificacao: 'BOV-0005', 
    tipo: 'Bezerro',
    raca: 'Nelore',
    dataNascimento: '2023-01-14',
    peso: 120,
    status: 'Saudável',
    sexo: 'Macho'
  },
]

// Tipo para o animal
interface Animal {
  _id: string;
  id?: string;
  identificacao: string;
  tipo: string;
  raca: string;
  dataNascimento: string;
  peso: number;
  status: string;
  sexo: string;
  observacoes?: string;
}

export default function GerenciamentoRebanho() {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  // Buscar dados do banco
  useEffect(() => {
    const buscarAnimais = async () => {
      try {
        setCarregando(true)
        
        // Construir URL com os filtros
        let url = '/api/animais'
        const params = new URLSearchParams()
        
        if (filterType) params.append('tipo', filterType)
        if (filterStatus) params.append('status', filterStatus)
        if (searchTerm) params.append('termo', searchTerm)
        
        if (params.toString()) {
          url += `?${params.toString()}`
        }
        
        // Fazer a requisição
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados')
        }
        
        const data = await response.json()
        
        // Atualizar estado com os dados
        setAnimais(data.animais || [])
        setErro('')
      } catch (error) {
        console.error('Erro ao buscar animais:', error)
        setErro('Não foi possível carregar os animais. Tente novamente.')
        // Usar dados mockados como fallback em caso de erro
        setAnimais(animalMockData)
      } finally {
        setCarregando(false)
      }
    }
    
    buscarAnimais()
  }, [filterType, filterStatus, searchTerm])
  
  // Filtrar animais (já é feito pelo backend, mas mantemos como fallback)
  const filteredAnimais = animais;
  
  // Função para excluir animal
  const excluirAnimal = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      try {
        // Chamar API para exclusão
        const response = await fetch(`/api/animais/${id}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Erro ao excluir animal')
        }
        
        // Atualizar a lista localmente removendo o animal
        setAnimais(animais.filter(a => a._id !== id))
      } catch (error) {
        console.error('Erro ao excluir animal:', error)
        alert('Erro ao excluir animal. Tente novamente.')
      }
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento do Rebanho</h1>
          <p className="text-gray-600">Cadastre, consulte e gerencie todo o seu rebanho</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link 
            href="/dashboard/rebanho/cadastrar" 
            className="btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Animal
          </Link>
        </div>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Pesquisar
            </label>
            <input
              type="text"
              id="search"
              className="input-field"
              placeholder="Identificação ou raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="filterType"
              className="input-field"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Bezerro">Bezerro</option>
              <option value="Novilho">Novilho</option>
              <option value="Boi">Boi</option>
              <option value="Vaca">Vaca</option>
              <option value="Touro">Touro</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="filterStatus"
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Saudável">Saudável</option>
              <option value="Em tratamento">Em tratamento</option>
              <option value="Prenhe">Prenhe</option>
              <option value="Em Quarentena">Em Quarentena</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estado de carregamento e erro */}
      {carregando && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-2"></div>
          <p className="text-gray-600">Carregando animais...</p>
        </div>
      )}
      
      {erro && !carregando && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>{erro}</p>
        </div>
      )}

      {/* Tabela de Animais */}
      {!carregando && !erro && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Identificação
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo/Raça
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nascimento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peso (kg)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sexo
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAnimais.map((animal) => (
                  <tr key={animal._id || animal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{animal.identificacao}</div>
                      <div className="text-sm text-gray-500">ID: {animal._id || animal.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{animal.tipo}</div>
                      <div className="text-sm text-gray-500">{animal.raca}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(animal.dataNascimento).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {animal.peso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        animal.status === 'Saudável' ? 'bg-green-100 text-green-800' :
                        animal.status === 'Em tratamento' ? 'bg-yellow-100 text-yellow-800' :
                        animal.status === 'Prenhe' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {animal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {animal.sexo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/dashboard/rebanho/${animal._id || animal.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Ver
                        </Link>
                        <Link 
                          href={`/dashboard/rebanho/editar/${animal._id || animal.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </Link>
                        <button 
                          onClick={() => excluirAnimal(animal._id || animal.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredAnimais.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Nenhum animal encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 