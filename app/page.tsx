import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fazenda Manager</h1>
          <div className="space-x-4">
            <Link href="/auth/login" className="hover:underline">
              Entrar
            </Link>
            <Link href="/auth/cadastro" className="btn-secondary">
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Sistema Completo de Gerenciamento para Fazendas de Gado</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Controle seu rebanho com eficiência. Monitore saúde, reprodução, alimentação e finanças em uma única plataforma.
          </p>
          <Link href="/auth/cadastro" className="btn-secondary text-lg py-3 px-8">
            Comece Agora
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão de Rebanho</h3>
              <p className="text-gray-600">
                Cadastre, acompanhe e gerencie todo seu rebanho com facilidade. Histórico completo de cada animal.
              </p>
            </div>
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Controle de Saúde</h3>
              <p className="text-gray-600">
                Monitore vacinas, tratamentos e condição de saúde dos animais. Receba alertas sobre prazos importantes.
              </p>
            </div>
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão Financeira</h3>
              <p className="text-gray-600">
                Acompanhe custos, receitas e lucratividade. Relatórios financeiros detalhados para tomada de decisões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar a gestão da sua fazenda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experimente o Fazenda Manager hoje e tenha o controle completo de sua fazenda na palma da mão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/cadastro" className="btn-secondary text-lg py-3 px-8">
              Cadastrar Agora
            </Link>
            <Link href="/contato" className="bg-white text-primary-700 hover:bg-gray-100 text-lg font-bold py-3 px-8 rounded transition-colors">
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fazenda Manager</h3>
              <p className="text-gray-300">
                Solução completa para gerenciamento de fazendas de gado.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="/funcionalidades" className="text-gray-300 hover:text-white">Funcionalidades</Link></li>
                <li><Link href="/planos" className="text-gray-300 hover:text-white">Planos</Link></li>
                <li><Link href="/suporte" className="text-gray-300 hover:text-white">Suporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/termos" className="text-gray-300 hover:text-white">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="text-gray-300 hover:text-white">Política de Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">contato@fazendamanager.com.br</li>
                <li className="text-gray-300">(11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Fazenda Manager. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 