'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CadastrarAnimal() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    identificacao: '',
    tipo: '',
    raca: '',
    dataNascimento: '',
    peso: '',
    status: 'Saudável',
    sexo: 'Macho',
    observacoes: ''
  })
  
  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Validar formulário
  const validarFormulario = () => {
    if (!formData.identificacao.trim()) {
      setMensagem({ tipo: 'erro', texto: 'A identificação é obrigatória' })
      return false
    }
    
    if (!formData.tipo) {
      setMensagem({ tipo: 'erro', texto: 'O tipo de animal é obrigatório' })
      return false
    }
    
    if (!formData.raca.trim()) {
      setMensagem({ tipo: 'erro', texto: 'A raça é obrigatória' })
      return false
    }
    
    if (!formData.dataNascimento) {
      setMensagem({ tipo: 'erro', texto: 'A data de nascimento é obrigatória' })
      return false
    }
    
    if (!formData.peso || isNaN(Number(formData.peso))) {
      setMensagem({ tipo: 'erro', texto: 'Informe um peso válido' })
      return false
    }
    
    return true
  }
  
  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validarFormulario()) {
      return
    }
    
    setCarregando(true)
    setMensagem({ tipo: '', texto: '' })
    
    try {
      // Simulação de cadastro (em ambiente real, isso seria uma chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Dados do animal formatados para envio
      const dadosAnimal = {
        ...formData,
        peso: Number(formData.peso)
      }
      
      console.log('Animal cadastrado:', dadosAnimal)
      
      // Mostrar mensagem de sucesso
      setMensagem({ 
        tipo: 'sucesso', 
        texto: 'Animal cadastrado com sucesso!' 
      })
      
      // Redirecionar após um breve delay
      setTimeout(() => {
        router.push('/dashboard/rebanho')
      }, 2000)
      
    } catch (error) {
      console.error('Erro ao cadastrar animal:', error)
      setMensagem({ 
        tipo: 'erro', 
        texto: 'Erro ao cadastrar animal. Tente novamente.' 
      })
    } finally {
      setCarregando(false)
    }
  }
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Animal</h1>
          <p className="text-gray-600">Preencha os dados para adicionar um novo animal ao rebanho</p>
        </div>
        <Link 
          href="/dashboard/rebanho" 
          className="btn-outline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </Link>
      </div>
      
      {/* Cartão do formulário */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Mensagens de feedback */}
        {mensagem.texto && (
          <div className={`mb-6 p-4 rounded-md ${
            mensagem.tipo === 'erro' 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {mensagem.texto}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identificação */}
            <div>
              <label htmlFor="identificacao" className="block text-sm font-medium text-gray-700 mb-1">
                Identificação/Brinco *
              </label>
              <input
                type="text"
                id="identificacao"
                name="identificacao"
                className="input-field"
                placeholder="Ex: BOV-0001"
                value={formData.identificacao}
                onChange={handleChange}
                disabled={carregando}
                required
              />
            </div>
            
            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo *
              </label>
              <select
                id="tipo"
                name="tipo"
                className="input-field"
                value={formData.tipo}
                onChange={handleChange}
                disabled={carregando}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Bezerro">Bezerro</option>
                <option value="Novilho">Novilho</option>
                <option value="Boi">Boi</option>
                <option value="Vaca">Vaca</option>
                <option value="Touro">Touro</option>
              </select>
            </div>
            
            {/* Raça */}
            <div>
              <label htmlFor="raca" className="block text-sm font-medium text-gray-700 mb-1">
                Raça *
              </label>
              <input
                type="text"
                id="raca"
                name="raca"
                className="input-field"
                placeholder="Ex: Nelore"
                value={formData.raca}
                onChange={handleChange}
                disabled={carregando}
                required
              />
            </div>
            
            {/* Data de Nascimento */}
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento *
              </label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                className="input-field"
                value={formData.dataNascimento}
                onChange={handleChange}
                disabled={carregando}
                required
              />
            </div>
            
            {/* Peso */}
            <div>
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">
                Peso (kg) *
              </label>
              <input
                type="number"
                id="peso"
                name="peso"
                className="input-field"
                placeholder="Ex: 350"
                value={formData.peso}
                onChange={handleChange}
                disabled={carregando}
                min="1"
                step="0.1"
                required
              />
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="input-field"
                value={formData.status}
                onChange={handleChange}
                disabled={carregando}
              >
                <option value="Saudável">Saudável</option>
                <option value="Em tratamento">Em tratamento</option>
                <option value="Prenhe">Prenhe</option>
                <option value="Em Quarentena">Em Quarentena</option>
              </select>
            </div>
            
            {/* Sexo */}
            <div>
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                className="input-field"
                value={formData.sexo}
                onChange={handleChange}
                disabled={carregando}
              >
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
            
            {/* Observações */}
            <div className="md:col-span-2">
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                className="input-field"
                placeholder="Informações adicionais sobre o animal..."
                value={formData.observacoes}
                onChange={handleChange}
                disabled={carregando}
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="btn-outline mr-4"
              onClick={() => router.push('/dashboard/rebanho')}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : 'Cadastrar Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 