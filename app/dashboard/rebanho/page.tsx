'use client'

import { useState } from 'react'
import Link from 'next/link'

// Dados simulados de animais
const animalMockData = [
  { 
    id: '001', 
    identificacao: 'BOV-0001', 
    tipo: 'Boi',
    raca: 'Nelore',
    dataNascimento: '12/06/2020',
    peso: 580,
    status: 'Saudável',
    sexo: 'Macho'
  },
  { 
    id: '002', 
    identificacao: 'BOV-0002', 
    tipo: 'Vaca',
    raca: 'Gir',
    dataNascimento: '05/03/2019',
    peso: 450,
    status: 'Saudável',
    sexo: 'Fêmea'
  },
  { 
    id: '003', 
    identificacao: 'BOV-0003', 
    tipo: 'Novilho',
    raca: 'Angus',
    dataNascimento: '18/09/2021',
    peso: 320,
    status: 'Em tratamento',
    sexo: 'Macho'
  },
  { 
    id: '004', 
    identificacao: 'BOV-0004', 
    tipo: 'Vaca',
    raca: 'Holandesa',
    dataNascimento: '22/11/2018',
    peso: 520,
    status: 'Prenhe',
    sexo: 'Fêmea'
  },
  { 
    id: '005', 
    identificacao: 'BOV-0005', 
    tipo: 'Bezerro',
    raca: 'Nelore',
    dataNascimento: '14/01/2023',
    peso: 120,
    status: 'Saudável',
    sexo: 'Macho'
  },
]

export default function GerenciamentoRebanho() {
  const [animais, setAnimais] = useState(animalMockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  // Função para filtrar os animais
  const filteredAnimais = animais.filter(animal => {
    const matchesSearch = animal.identificacao.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         animal.raca.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === '' || animal.tipo === filterType
    const matchesStatus = filterStatus === '' || animal.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })
  
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

      {/* Tabela de Animais */}
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
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{animal.identificacao}</div>
                    <div className="text-sm text-gray-500">ID: {animal.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{animal.tipo}</div>
                    <div className="text-sm text-gray-500">{animal.raca}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {animal.dataNascimento}
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
                        href={`/dashboard/rebanho/${animal.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Ver
                      </Link>
                      <Link 
                        href={`/dashboard/rebanho/editar/${animal.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => {
                          if (confirm('Tem certeza que deseja excluir este animal?')) {
                            setAnimais(animais.filter(a => a.id !== animal.id))
                          }
                        }}
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

        {/* Paginação */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredAnimais.length}</span> de{' '}
                <span className="font-medium">{filteredAnimais.length}</span> resultado(s)
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Próximo</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 