'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaHorse, FaSyringe, FaBaby, FaMoneyBillWave, 
  FaChartBar, FaClipboardCheck, FaLeaf, FaCloud, 
  FaSun, FaChartPie, FaWeight, FaCalendarCheck,
  FaExclamationTriangle 
} from 'react-icons/fa'

// Componente de Card para o Dashboard
interface DashboardCardProps {
  title: string
  value: string | number
  description: string
  trend?: 'up' | 'down' | 'neutral'
  percentage?: number
  icon: React.ReactNode
  link: string
  delay?: number
}

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  trend = 'neutral', 
  percentage = 0, 
  icon, 
  link,
  delay = 0 
}: DashboardCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [count, setCount] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, '')) || 0
  
  useEffect(() => {
    setIsLoaded(true)
    if (typeof value === 'number' || !isNaN(parseInt(value.replace(/[^0-9]/g, '')))) {
      const timer = setTimeout(() => {
        const duration = 1500
        const step = numericValue / (duration / 50)
        let current = 0
        
        const interval = setInterval(() => {
          current += step
          if (current >= numericValue) {
            setCount(numericValue)
            clearInterval(interval)
          } else {
            setCount(Math.floor(current))
          }
        }, 50)
        
        return () => clearInterval(interval)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [numericValue, delay, value])
  
  const displayValue = typeof value === 'string' && value.includes('R$') 
    ? `R$ ${count.toLocaleString('pt-BR')}` 
    : count.toLocaleString('pt-BR')
  
  return (
    <Link 
      href={link} 
      className={`card p-6 hover:shadow-lg transition-all duration-500 overflow-hidden relative bg-gradient-to-br ${
        isLoaded ? 'from-white to-gray-50' : 'from-gray-100 to-gray-200'
      } animate-slideInUp border border-gray-100 group`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary-50 rounded-bl-full opacity-50 transform -translate-x-1/4 translate-y-1/4 group-hover:scale-125 transition-transform duration-500"></div>
      
      <div className="flex justify-between relative z-10">
        <div>
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">{
            isLoaded ? displayValue : 
            <span className="skeleton-loader inline-block w-16 h-8"></span>
          }</p>
          <div className="flex items-center mt-2">
            {trend === 'up' && (
              <span className="text-green-600 flex items-center text-sm bg-green-50 px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {percentage}%
              </span>
            )}
            {trend === 'down' && (
              <span className="text-red-600 flex items-center text-sm bg-red-50 px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {percentage}%
              </span>
            )}
            <span className="text-gray-600 ml-2 text-sm">{description}</span>
          </div>
        </div>
        <div className="bg-primary-100 p-3 rounded-full h-14 w-14 flex items-center justify-center text-primary-600 shadow-sm transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          {icon}
        </div>
      </div>
      
      {/* Hover State Indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary-500 w-0 transition-all duration-300 group-hover:w-full"></div>
    </Link>
  )
}

// Componente de Card para Tarefas Pendentes
interface TaskCardProps {
  title: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  animal?: string
  status: string
  index: number
  onActionClick?: () => void
}

const TaskCard = ({ title, dueDate, priority, animal, status, index, onActionClick }: TaskCardProps) => {
  const priorityColor = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  }
  
  return (
    <div 
      className="p-4 border border-gray-200 rounded-lg mb-3 hover:bg-gray-50 transform transition-all duration-300 hover:-translate-x-1 hover:shadow-md animate-slideInRight" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{title}</h4>
        <span className={`px-2 py-1 text-xs rounded-full ${priorityColor[priority]}`}>
          {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Média' : 'Baixa'}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {animal && <p>Animal: {animal}</p>}
        <p>Vencimento: {dueDate}</p>
        <p className="flex items-center">
          Status: 
          <span className={`ml-1 px-2 py-0.5 rounded text-xs ${
            status === 'Pendente' ? 'bg-yellow-50 text-yellow-600' : 
            status === 'Agendado' ? 'bg-blue-50 text-blue-600' : 
            'bg-green-50 text-green-600'
          }`}>
            {status}
          </span>
        </p>
      </div>
      <div className="w-full bg-gray-200 h-1 mt-3 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            status === 'Pendente' ? 'bg-yellow-400 w-1/4' : 
            status === 'Agendado' ? 'bg-blue-500 w-1/2' : 
            'bg-green-500 w-3/4'
          } transition-all duration-1000`}>
        </div>
      </div>
      {/* Botão de ação */}
      {onActionClick && (
        <div className="mt-3 text-right">
          <button
            onClick={onActionClick}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium hover:underline focus:outline-none transition-colors duration-300"
          >
            {status === 'Pendente' ? 'Iniciar' : status === 'Agendado' ? 'Reagendar' : 'Concluir'}
          </button>
        </div>
      )}
    </div>
  )
}

// Componente para o gráfico de linha
const LineChart = ({ data, title, isLoading = false }: { data: { month: string, value: number }[], title: string, isLoading?: boolean }) => {
  const max = Math.max(...data.map(d => d.value)) * 1.2
  
  if (isLoading) {
    return (
      <div className="mb-6 card p-4">
        <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="relative h-64 bg-gray-100 rounded">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="mb-6 card p-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="relative h-64">
        {/* Eixo Y */}
        <div className="absolute left-0 top-0 h-full w-1 flex flex-col justify-between text-xs text-gray-500">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mr-1">{Math.round(max * (4 - i) / 4)}</span>
              <div className="w-8 h-[1px] bg-gray-200"></div>
            </div>
          ))}
        </div>
        
        {/* Linhas de grade */}
        <div className="absolute left-10 top-0 right-0 h-full">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-[1px] bg-gray-100"
              style={{ top: `${(i * 25)}%` }}
            ></div>
          ))}
        </div>
        
        {/* Dados */}
        <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full" style={{ animationDelay: `${i * 100}ms` }}>
              <div 
                className="w-2/3 bg-primary-500 rounded-t-sm animate-slideInUp hover:bg-primary-600 transition-all duration-300 relative group"
                style={{ 
                  height: `${(d.value / max) * 100}%`,
                  animationDelay: `${i * 100 + 500}ms`
                }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.value.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [tasks, setTasks] = useState<Array<{
    id: number;
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    animal?: string;
    status: string;
  }>>([])
  
  useEffect(() => {
    // Simular chamada à API para buscar dados
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Simulando tempo de resposta da API
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Simulando tarefas (em um app real, esses dados viriam da API)
        setTasks([
          {
            id: 1,
            title: "Vacinação contra Febre Aftosa",
            dueDate: "20/05/2023",
            priority: "high",
            status: "Pendente",
            animal: "Vários (15)"
          },
          {
            id: 2,
            title: "Pesagem do Lote 12",
            dueDate: "25/05/2023",
            priority: "medium",
            status: "Agendado"
          },
          {
            id: 3,
            title: "Manutenção de Cercas",
            dueDate: "30/05/2023",
            priority: "low",
            status: "Em andamento"
          }
        ])
        
        setHasError(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Função para atualizar o status de uma tarefa
  const handleTaskAction = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Lógica para mudar o status da tarefa
          const newStatus = 
            task.status === 'Pendente' ? 'Agendado' : 
            task.status === 'Agendado' ? 'Em andamento' : 'Concluído'
          
          return { ...task, status: newStatus }
        }
        return task
      })
    )
    
    // Aqui chamaria a API para atualizar o status na base de dados
  }
  
  // Em um cenário real, buscaríamos esses dados de uma API
  const animalsByCategory = [
    { label: 'Bezerros', value: 45, color: 'bg-blue-500' },
    { label: 'Novilhos', value: 68, color: 'bg-green-500' },
    { label: 'Bois', value: 120, color: 'bg-yellow-500' },
    { label: 'Vacas', value: 97, color: 'bg-red-500' },
    { label: 'Touros', value: 15, color: 'bg-purple-500' },
  ]
  
  const monthlyIncome = [
    { month: 'Jan', value: 42500 },
    { month: 'Fev', value: 38900 },
    { month: 'Mar', value: 45600 },
    { month: 'Abr', value: 52000 },
    { month: 'Mai', value: 58500 },
    { month: 'Jun', value: 63200 },
  ]
  
  // Elementos decorativos aleatórios para fundo
  const decorativeElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 90}%`,
    size: 20 + Math.random() * 40,
    opacity: 0.05 + Math.random() * 0.1,
    delay: i * 200,
    duration: 15 + Math.random() * 20
  }))
  
  // Renderizar mensagem de erro quando houver falha na API
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-red-500 text-6xl mb-4">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ocorreu um erro</h2>
        <p className="text-gray-600 mb-4">Não foi possível carregar os dados do dashboard</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary px-4 py-2"
        >
          Tentar novamente
        </button>
      </div>
    )
  }
  
  return (
    <div className="relative overflow-hidden">
      {/* Elementos decorativos */}
      {decorativeElements.map(elem => (
        <div 
          key={elem.id}
          className="absolute rounded-full bg-primary-200 animate-float"
          style={{
            top: elem.top,
            left: elem.left,
            width: elem.size,
            height: elem.size,
            opacity: elem.opacity,
            animationDelay: `${elem.delay}ms`,
            animationDuration: `${elem.duration}s`
          }}
        ></div>
      ))}
      
      <div className="mb-6 relative z-10 animate-slideInUp">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de gerenciamento da Fazenda São João</p>
        <div className="h-1 w-20 bg-primary-500 mt-2 rounded-full"></div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        <DashboardCard
          title="Total de Animais"
          value={345}
          description="vs. período anterior"
          trend="up"
          percentage={12}
          icon={<FaHorse className="h-6 w-6" />}
          link="/dashboard/rebanho"
          delay={100}
        />
        
        <DashboardCard
          title="Vacinas Este Mês"
          value={18}
          description="pendentes"
          icon={<FaSyringe className="h-6 w-6" />}
          link="/dashboard/saude"
          delay={200}
        />
        
        <DashboardCard
          title="Nascimentos"
          value={8}
          description="último mês"
          trend="up"
          percentage={15}
          icon={<FaBaby className="h-6 w-6" />}
          link="/dashboard/reproducao"
          delay={300}
        />
        
        <DashboardCard
          title="Receita (Mensal)"
          value="R$ 58500"
          description="vs. mês anterior"
          trend="up"
          percentage={8}
          icon={<FaMoneyBillWave className="h-6 w-6" />}
          link="/dashboard/financeiro"
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Gráfico de Receita Mensal */}
        <div className="lg:col-span-2 animate-slideInUp" style={{ animationDelay: '300ms' }}>
          <LineChart data={monthlyIncome} title="Receita Mensal (R$)" isLoading={isLoading} />
        </div>
        
        {/* Distribuição do Rebanho */}
        <div className="card col-span-1 lg:row-span-2 p-6 animate-slideInRight" style={{ animationDelay: '400ms' }}>
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <FaChartPie className="mr-2 text-primary-500" />
            Distribuição do Rebanho
          </h2>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
          <div className="flex flex-col">
            {animalsByCategory.map((category, index) => (
              <div 
                key={index} 
                className="mb-4 animate-slideInRight" 
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${category.color} mr-2`}></div>
                    <span className="text-sm text-gray-600">{category.label}</span>
                  </div>
                  <span className="font-medium">{category.value}</span>
                </div>
                <div className="mt-1 relative h-6 flex items-center">
                  <div className="bg-gray-200 rounded-full h-2.5 w-full">
                    <div 
                      className={`h-2.5 rounded-full ${category.color} transition-all duration-1500`} 
                      style={{ width: isLoading ? '0%' : `${(category.value / 345) * 100}%` }}
                    ></div>
                  </div>
                  <span className="absolute right-0 text-gray-500 text-xs">
                    {Math.round((category.value / 345) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          )}
          <div className="mt-6 flex justify-between">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 animate-pulse-custom">345</div>
              <div className="text-xs text-gray-500 mt-1">Total de Animais</div>
            </div>
            <Link href="/dashboard/rebanho" className="bg-primary-50 hover:bg-primary-100 text-primary-600 p-2 rounded-lg flex items-center transition-all duration-300 transform hover:translate-x-1">
              Ver detalhes
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Status e Desempenho */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInUp" style={{ animationDelay: '500ms' }}>
          <div className="card p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <FaWeight className="mr-2 text-primary-500" />
              Peso Médio (kg)
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="h-24 rounded bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-green-600 text-xs uppercase font-semibold">Novilhos</div>
                <div className="text-2xl font-bold mt-1">320</div>
                <div className="text-xs text-gray-500 mt-1">+15kg (4.9%)</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-blue-600 text-xs uppercase font-semibold">Bezerros</div>
                <div className="text-2xl font-bold mt-1">125</div>
                <div className="text-xs text-gray-500 mt-1">+8kg (6.8%)</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-yellow-600 text-xs uppercase font-semibold">Bois</div>
                <div className="text-2xl font-bold mt-1">480</div>
                <div className="text-xs text-gray-500 mt-1">+22kg (4.8%)</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-red-600 text-xs uppercase font-semibold">Vacas</div>
                <div className="text-2xl font-bold mt-1">420</div>
                <div className="text-xs text-gray-500 mt-1">+12kg (2.9%)</div>
              </div>
            </div>
            )}
          </div>
          
          {/* Tarefas Pendentes */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <FaCalendarCheck className="mr-2 text-primary-500" />
                Próximas Tarefas
              </h2>
              <Link href="/dashboard/tarefas" className="text-sm text-primary-600 hover:text-primary-700 flex items-center group">
                <span>Ver todas</span>
                <svg className="w-4 h-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="h-24 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <FaCalendarCheck className="text-4xl mb-2 text-gray-300" />
                <p>Nenhuma tarefa pendente</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    status={task.status}
                    animal={task.animal}
                    index={index}
                    onActionClick={() => handleTaskAction(task.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Métricas de Saúde */}
      <div className="mt-8 card p-6 relative z-10 animate-slideInUp" style={{ animationDelay: '600ms' }}>
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <FaClipboardCheck className="mr-2 text-primary-500" />
          Resumo de Saúde do Rebanho
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-40 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-md">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                <FaSyringe className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-green-600 text-sm font-semibold">Animais Vacinados</div>
            <div className="text-3xl font-bold mt-1">215</div>
            <div className="text-xs text-gray-500 mt-2">62% do rebanho</div>
            <div className="w-full bg-white h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-md">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                <FaChartBar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-blue-600 text-sm font-semibold">Ganho de Peso Médio</div>
            <div className="text-3xl font-bold mt-1">0.85</div>
            <div className="text-xs text-gray-500 mt-2">kg/dia no último mês</div>
            <div className="w-full bg-white h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-md">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center">
                <FaLeaf className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-yellow-600 text-sm font-semibold">Suplementação</div>
            <div className="text-3xl font-bold mt-1">92%</div>
            <div className="text-xs text-gray-500 mt-2">Taxa de consumo</div>
            <div className="w-full bg-white h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-md">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-red-200 flex items-center justify-center">
                <FaSun className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="text-red-600 text-sm font-semibold">Tratamentos Ativos</div>
            <div className="text-3xl font-bold mt-1">12</div>
            <div className="text-xs text-gray-500 mt-2">3.5% do rebanho</div>
            <div className="w-full bg-white h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '3.5%' }}></div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
} 