'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHorse, FaHeartbeat, FaMoneyBillWave, FaBabyCarriage, FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes, FaHome } from 'react-icons/fa'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [menuAberto, setMenuAberto] = useState(false)
  const [loading, setLoading] = useState(true)
  const [usuarioAtual, setUsuarioAtual] = useState({
    nome: 'João Silva',
    cargo: 'Administrador',
    avatar: '/images/avatar.jpg'
  })

  // Simular um carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  // Itens do menu de navegação
  const menuItems = [
    { 
      path: '/dashboard', 
      label: 'Início', 
      icon: <FaHome className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/rebanho', 
      label: 'Rebanho', 
      icon: <FaHorse className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/saude', 
      label: 'Saúde', 
      icon: <FaHeartbeat className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/financeiro', 
      label: 'Financeiro', 
      icon: <FaMoneyBillWave className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/reproducao', 
      label: 'Reprodução', 
      icon: <FaBabyCarriage className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/relatorios', 
      label: 'Relatórios', 
      icon: <FaChartBar className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/usuarios', 
      label: 'Usuários', 
      icon: <FaUsers className="w-5 h-5" /> 
    },
    { 
      path: '/dashboard/configuracoes', 
      label: 'Configurações', 
      icon: <FaCog className="w-5 h-5" /> 
    }
  ]

  const toggleMenu = () => {
    setMenuAberto(!menuAberto)
  }

  // Função para verificar se o item está ativo
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(path)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 animate-fadeIn">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando painel de controle...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-gray-900 mr-4 transition-transform duration-200 hover:scale-110"
            >
              {menuAberto ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <Link href="/dashboard" className="text-2xl font-bold text-primary-600 flex items-center hover:text-primary-700 transition-all duration-300 transform hover:scale-105">
              <FaHorse className="mr-2" /> 
              <span>GadoGest</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="relative w-10 h-10 overflow-hidden bg-primary-100 rounded-full mr-3 border-2 border-primary-300">
                <div className="absolute inset-0 flex items-center justify-center text-primary-600 font-bold text-lg">
                  {usuarioAtual.nome.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{usuarioAtual.nome}</p>
                <p className="text-xs text-gray-500">{usuarioAtual.cargo}</p>
              </div>
            </div>
            
            <Link 
              href="/auth/login" 
              className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-all duration-300"
              title="Sair"
            >
              <FaSignOutAlt />
            </Link>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Barra lateral */}
        <aside 
          className={`bg-white shadow-lg w-64 transition-all duration-300 transform fixed md:relative inset-y-0 left-0 z-50 md:translate-x-0 ${
            menuAberto ? 'translate-x-0' : '-translate-x-full'
          } md:block`}
        >
          <div className="h-full flex flex-col overflow-y-auto">
            <div className="md:hidden p-4 border-b border-gray-200 flex items-center">
              <div className="relative w-10 h-10 overflow-hidden bg-primary-100 rounded-full mr-3 border-2 border-primary-300">
                <div className="absolute inset-0 flex items-center justify-center text-primary-600 font-bold text-lg">
                  {usuarioAtual.nome.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{usuarioAtual.nome}</p>
                <p className="text-xs text-gray-500">{usuarioAtual.cargo}</p>
              </div>
            </div>
            
            <nav className="py-4 px-2 flex-grow">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`group flex items-center px-3 py-3 rounded-md transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary-100 text-primary-800 font-medium shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMenuAberto(false)}
                    >
                      <span className={`transition-all duration-300 mr-3 ${isActive(item.path) ? 'text-primary-600 transform scale-110' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {item.icon}
                      </span>
                      <span className="transition-transform duration-300 transform origin-left group-hover:translate-x-1">
                        {item.label}
                      </span>
                      {isActive(item.path) && (
                        <span className="ml-auto w-1.5 h-8 bg-primary-600 rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <Link
                href="/auth/login"
                className="flex items-center text-red-600 hover:text-red-800 transition-all duration-200 hover:bg-red-50 px-3 py-2 rounded-md group"
              >
                <FaSignOutAlt className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90" />
                <span>Sair</span>
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Sobreposição de fundo quando o menu está aberto em dispositivos móveis */}
        {menuAberto && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMenuAberto(false)}
          ></div>
        )}
        
        {/* Conteúdo principal */}
        <main className="flex-grow p-6 overflow-hidden">
          <div className="container mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
      
      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          GadoGest &copy; {new Date().getFullYear()} - Sistema de Gestão para Fazenda de Gado
        </div>
      </footer>
    </div>
  )
} 