import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Usuario from '@/app/models/Usuario';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const { email, senha } = await request.json();
    
    // Validar dados
    if (!email || !senha) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe email e senha' },
        { status: 400 }
      );
    }
    
    // Buscar usuário pelo email
    const usuario = await Usuario.findOne({ email }).select('+senha');
    
    // Verificar se o usuário existe
    if (!usuario) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar senha
    const senhaCorreta = await usuario.verificarSenha(senha);
    
    if (!senhaCorreta) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Atualizar último acesso
    usuario.ultimoAcesso = new Date();
    await usuario.save();
    
    // Criar token JWT
    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, fazenda: usuario.fazenda },
      process.env.JWT_SECRET || 'sua_chave_secreta_jwt',
      { expiresIn: '1d' }
    );
    
    // Retornar resposta com token
    return NextResponse.json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        fazenda: usuario.fazenda,
        cargo: usuario.cargo
      }
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro no servidor' },
      { status: 500 }
    );
  }
} 