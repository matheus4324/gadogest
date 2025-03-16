'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

// Schema de validação
const RegistroSaudeSchema = Yup.object().shape({
  animal: Yup.string()
    .required('Animal é obrigatório'),
  tipo: Yup.string()
    .required('Tipo de procedimento é obrigatório'),
  data: Yup.date()
    .required('Data é obrigatória'),
  aplicador: Yup.string()
    .required('Aplicador é obrigatório'),
  status: Yup.string()
    .required('Status é obrigatório'),
  produto: Yup.string(),
  dosagem: Yup.string(),
  veterinario: Yup.string(),
  observacoes: Yup.string(),
  proximaAplicacao: Yup.date().nullable(),
  atualizarStatusAnimal: Yup.boolean(),
  novoStatusAnimal: Yup.string().when('atualizarStatusAnimal', {
    is: true,
    then: (schema) => schema.required('Status do animal é obrigatório'),
    otherwise: (schema) => schema
  })
})

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

export default function EditarRegistroSaude({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [registro, setRegistro] = useState<RegistroSaude | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [erro, setErro] = useState('')
  const [animais, setAnimais] = useState([
    { _id: '101', identificacao: 'BOV-2023-001', tipo: 'Boi', raca: 'Nelore' },
    { _id: '102', identificacao: 'BOV-2023-005', tipo: 'Vaca', raca: 'Gir' },
    { _id: '103', identificacao: 'BOV-2023-010', tipo: 'Bezerro', raca: 'Nelore' },
    { _id: '104', identificacao: 'BOV-2023-012', tipo: 'Vaca', raca: 'Holandesa' },
  ])

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
            observacoes: 'Animal sem reações adversas.',
            status: 'Realizado',
            dataCadastro: '2023-09-15',
            custo: 45.90,
            proximaAplicacao: '2024-09-15'
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

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true)
      setErro('')

      // Simulando envio para a API
      console.log('Dados do formulário:', values)
      
      // Em um cenário real, enviaríamos para a API
      // const resposta = await fetch(`/api/saude/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // })
      
      // if (!resposta.ok) {
      //   throw new Error('Erro ao atualizar registro de saúde')
      // }
      
      // Simulando sucesso na operação
      setTimeout(() => {
        setSubmitting(false)
        router.push(`/dashboard/saude/${params.id}`)
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao atualizar registro:', error)
      setErro('Não foi possível atualizar o registro. Tente novamente mais tarde.')
      setSubmitting(false)
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Carregando dados do registro...</p>
      </div>
    )
  }
  
  if (erro && !registro) {
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
        <button 
          onClick={() => router.push('/dashboard/saude')}
          className="mt-4 text-sm text-yellow-600 hover:text-yellow-800"
        >
          Voltar para lista
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Registro de Saúde</h1>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>
      </div>
      
      <div className="bg-white rounded-md shadow-md p-6">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {erro}
          </div>
        )}
        
        <Formik
          initialValues={{
            animal: registro.animal._id,
            tipo: registro.tipo,
            data: registro.data,
            produto: registro.produto || '',
            dosagem: registro.dosagem || '',
            aplicador: registro.aplicador,
            veterinario: registro.veterinario || '',
            observacoes: registro.observacoes || '',
            status: registro.status,
            proximaAplicacao: registro.proximaAplicacao || '',
            atualizarStatusAnimal: false,
            novoStatusAnimal: ''
          }}
          validationSchema={RegistroSaudeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Animal */}
                <div>
                  <label htmlFor="animal" className="block text-sm font-medium text-gray-700 mb-1">
                    Animal *
                  </label>
                  <Field
                    as="select"
                    id="animal"
                    name="animal"
                    className="input-field"
                  >
                    <option value="">Selecione um animal</option>
                    {animais.map((animal) => (
                      <option key={animal._id} value={animal._id}>
                        {animal.identificacao} - {animal.tipo} ({animal.raca})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="animal" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Tipo de Procedimento */}
                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Procedimento *
                  </label>
                  <Field
                    as="select"
                    id="tipo"
                    name="tipo"
                    className="input-field"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Vacinação">Vacinação</option>
                    <option value="Medicação">Medicação</option>
                    <option value="Exame">Exame</option>
                    <option value="Cirurgia">Cirurgia</option>
                    <option value="Outro">Outro</option>
                  </Field>
                  <ErrorMessage name="tipo" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Data */}
                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                    Data *
                  </label>
                  <Field
                    type="date"
                    id="data"
                    name="data"
                    className="input-field"
                  />
                  <ErrorMessage name="data" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className="input-field"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Cancelado">Cancelado</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Produto */}
                <div>
                  <label htmlFor="produto" className="block text-sm font-medium text-gray-700 mb-1">
                    Produto/Medicamento
                  </label>
                  <Field
                    type="text"
                    id="produto"
                    name="produto"
                    className="input-field"
                  />
                  <ErrorMessage name="produto" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Dosagem */}
                <div>
                  <label htmlFor="dosagem" className="block text-sm font-medium text-gray-700 mb-1">
                    Dosagem
                  </label>
                  <Field
                    type="text"
                    id="dosagem"
                    name="dosagem"
                    className="input-field"
                  />
                  <ErrorMessage name="dosagem" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Aplicador */}
                <div>
                  <label htmlFor="aplicador" className="block text-sm font-medium text-gray-700 mb-1">
                    Aplicador *
                  </label>
                  <Field
                    type="text"
                    id="aplicador"
                    name="aplicador"
                    className="input-field"
                  />
                  <ErrorMessage name="aplicador" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Veterinário */}
                <div>
                  <label htmlFor="veterinario" className="block text-sm font-medium text-gray-700 mb-1">
                    Veterinário
                  </label>
                  <Field
                    type="text"
                    id="veterinario"
                    name="veterinario"
                    className="input-field"
                  />
                  <ErrorMessage name="veterinario" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                {/* Próxima Aplicação */}
                <div>
                  <label htmlFor="proximaAplicacao" className="block text-sm font-medium text-gray-700 mb-1">
                    Próxima Aplicação
                  </label>
                  <Field
                    type="date"
                    id="proximaAplicacao"
                    name="proximaAplicacao"
                    className="input-field"
                  />
                  <ErrorMessage name="proximaAplicacao" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>
              
              {/* Atualizar Status do Animal */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Field
                    type="checkbox"
                    id="atualizarStatusAnimal"
                    name="atualizarStatusAnimal"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="atualizarStatusAnimal" className="ml-2 block text-sm text-gray-900">
                    Atualizar status do animal
                  </label>
                </div>
                
                {values.atualizarStatusAnimal && (
                  <div className="ml-6">
                    <label htmlFor="novoStatusAnimal" className="block text-sm font-medium text-gray-700 mb-1">
                      Novo Status do Animal *
                    </label>
                    <Field
                      as="select"
                      id="novoStatusAnimal"
                      name="novoStatusAnimal"
                      className="input-field"
                    >
                      <option value="">Selecione o status</option>
                      <option value="Saudável">Saudável</option>
                      <option value="Em tratamento">Em tratamento</option>
                      <option value="Prenhe">Prenhe</option>
                      <option value="Em Quarentena">Em Quarentena</option>
                    </Field>
                    <ErrorMessage name="novoStatusAnimal" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                )}
              </div>
              
              {/* Observações */}
              <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <Field
                  as="textarea"
                  id="observacoes"
                  name="observacoes"
                  rows={4}
                  className="input-field"
                />
                <ErrorMessage name="observacoes" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              {/* Botões */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaSave />
                  <span>{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
} 