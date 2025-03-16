import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Usuario from '@/app/models/Usuario';

export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const { nome, email, senha, confirmarSenha, nomeFazenda } = await request.json();
    
    // Validar dados
    if (!nome || !email || !senha || !confirmarSenha || !nomeFazenda) {
      return NextResponse.json(
        { success: false, message: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      return NextResponse.json(
        { success: false, message: 'As senhas não coincidem' },
        { status: 400 }
      );
    }
    
    // Verificar se o email já está em uso
    const usuarioExistente = await Usuario.findOne({ email });
    
    if (usuarioExistente) {
      return NextResponse.json(
        { success: false, message: 'Este email já está em uso' },
        { status: 400 }
      );
    }
    
    // Criar novo usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
      fazenda: nomeFazenda,
      cargo: 'Administrador', // Primeiro usuário é administrador
      ativo: true,
      dataCriacao: new Date()
    });
    
    // Remover a senha da resposta
    novoUsuario.senha = '';
    
    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        fazenda: novoUsuario.fazenda
      }
    });
    
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    
    // Verificar se é um erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((err: any) => err.message);
      
      return NextResponse.json(
        { success: false, message: mensagens.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Erro no servidor' },
      { status: 500 }
    );
  }
} 