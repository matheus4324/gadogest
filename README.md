# Sistema de Gestão para Fazenda de Gado

## Visão Geral
Sistema completo para gerenciamento de fazendas de gado, incluindo controle de rebanho, saúde animal, reprodução, controle financeiro e geração de relatórios.

## Funcionalidades Principais

### Gerenciamento de Rebanho
- Cadastro completo de animais com identificação, tipo, raça, data de nascimento
- Controle de entrada e saída de animais
- Histórico completo de cada animal
- Categorização por tipo, raça e idade

### Saúde Animal
- Registro de vacinações, medicações e procedimentos veterinários
- Agendamento de procedimentos futuros
- Controle de vencimento de vacinas
- Histórico médico completo por animal
- Opção para remoção de registros e limpeza de dados

### Controle Reprodutivo
- Gestão de coberturas, gestações e nascimentos
- Acompanhamento de prenhez
- Histórico reprodutivo dos animais
- Controle de linhagens genéticas
- Opção para remoção de registros e limpeza de dados

### Gestão Financeira
- Controle de receitas e despesas
- Categorização por tipo e finalidade
- Relatórios financeiros por período
- Acompanhamento de lucratividade
- Opção para remoção de registros e limpeza de dados

### Relatórios
- Relatórios pré-definidos para todas as áreas
- Criação de relatórios personalizados com campos selecionáveis
- Exportação em PDF e Excel
- Impressão direta de relatórios
- Opção para limpar relatórios gerados

## Tecnologias Utilizadas

- **Next.js 14**: Framework React para desenvolvimento frontend e backend
- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para mais segurança no código
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados
- **Mongoose**: ODM para modelagem de dados no MongoDB
- **TailwindCSS**: Framework CSS para estilização
- **JWT**: Autenticação baseada em tokens
- **React Icons**: Biblioteca de ícones SVG
- **React Hook Form**: Gerenciamento de formulários

## Recursos de Interface

- Design responsivo para uso em desktop, tablet e mobile
- Tema de cores personalizável
- Animações e transições suaves para melhor experiência do usuário
- Feedback visual interativo em ações importantes
- Modais de confirmação para ações críticas
- Sistema de notificações para alertas importantes

## Melhorias Visuais e Interativas

- **Animações de Transição**: Efeitos suaves em todas as interações
- **Efeitos Hover**: Feedback visual ao passar o mouse sobre elementos
- **Cards Interativos**: Elementos com animações de escala e elevação
- **Confirmações Visuais**: Modais para confirmar ações importantes
- **Loading States**: Indicações visuais durante o carregamento de dados
- **Animações de Listas**: Entradas e saídas suaves em elementos de lista
- **Esquema de Cores Consistente**: Cores específicas para cada módulo do sistema
- **Micro-interações**: Pequenas animações para melhorar a experiência do usuário

## Como Iniciar

1. **Clone o repositório**
   ```
   git clone https://github.com/seu-usuario/sistema-gestao-gado.git
   cd sistema-gestao-gado
   ```

2. **Instale as dependências**
   ```
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```
   MONGODB_URI=sua_conexao_mongodb
   JWT_SECRET=seu_jwt_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Inicie o servidor de desenvolvimento**
   ```
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse o sistema**
   Abra http://localhost:3000 no seu navegador

## Estrutura do Projeto

```
/app
  /api             # Rotas da API
  /auth            # Páginas de autenticação
  /dashboard       # Dashboard e módulos principais
    /rebanho       # Gerenciamento de rebanho
    /saude         # Saúde animal
    /reproducao    # Controle reprodutivo
    /financeiro    # Gestão financeira
    /relatorios    # Geração de relatórios
  /components      # Componentes reutilizáveis
  /hooks           # Hooks personalizados
  /lib             # Funções utilitárias
  /models          # Modelos do MongoDB
  /types           # Definições de tipos TypeScript
```

## Próximos Passos

- Implementação de dashboard com gráficos avançados
- Integração com APIs de clima
- Módulo de gestão de pastagens
- Aplicativo mobile para acesso em campo
- Integração com sistemas de identificação eletrônica (RFID)
- Sistema de backup automático na nuvem

## Licença

Este projeto está licenciado sob a Licença MIT. 