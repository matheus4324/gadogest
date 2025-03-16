import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Animal from '@/app/models/Animal';

/**
 * API para cadastrar um novo animal
 * POST /api/animais/cadastrar
 */
export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const dados = await request.json();
    
    // Validar dados obrigatórios
    if (!dados.identificacao || !dados.tipo || !dados.raca || !dados.dataNascimento || !dados.peso) {
      return NextResponse.json(
        { success: false, message: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se já existe um animal com a mesma identificação
    const animalExistente = await Animal.findOne({ identificacao: dados.identificacao });
    
    if (animalExistente) {
      return NextResponse.json(
        { success: false, message: 'Já existe um animal com essa identificação' },
        { status: 400 }
      );
    }
    
    // Preparar dados para criação
    const dadosAnimal = {
      identificacao: dados.identificacao,
      tipo: dados.tipo,
      raca: dados.raca,
      dataNascimento: dados.dataNascimento,
      peso: Number(dados.peso),
      status: dados.status || 'Saudável',
      sexo: dados.sexo || 'Macho',
      observacoes: dados.observacoes || '',
      dataCadastro: new Date()
    };
    
    // Criar novo animal
    const novoAnimal = await Animal.create(dadosAnimal);
    
    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Animal cadastrado com sucesso',
      animal: novoAnimal
    });
    
  } catch (error: any) {
    console.error('Erro ao cadastrar animal:', error);
    
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