import connectDB from './db';
import Usuario from '../models/Usuario';

/**
 * Função para inicializar o banco de dados com dados essenciais
 * como um usuário administrador, caso não exista nenhum
 */
export async function inicializarDados() {
  try {
    console.log('🌱 Verificando necessidade de inicialização do banco de dados...');
    
    // Conectar ao banco de dados
    await connectDB();
    
    // Verificar se já existe algum usuário
    const usuariosCount = await Usuario.countDocuments();
    
    if (usuariosCount === 0) {
      console.log('🌱 Nenhum usuário encontrado. Criando usuário administrador...');
      
      // Criar usuário administrador
      await Usuario.create({
        nome: 'Administrador',
        email: 'admin@gadogest.com',
        senha: 'admin123',  // Esta senha será automaticamente criptografada pelo modelo
        fazenda: 'Fazenda GadoGest',
        cargo: 'Administrador',
        ativo: true,
        dataCriacao: new Date()
      });
      
      console.log('✅ Usuário administrador criado com sucesso!');
      console.log('📧 Email: admin@gadogest.com');
      console.log('🔑 Senha: admin123');
    } else {
      console.log(`👍 Banco de dados já inicializado com ${usuariosCount} usuários.`);
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  }
} 