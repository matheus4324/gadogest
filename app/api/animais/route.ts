import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Animal from '@/app/models/Animal';
import { getServerSession } from 'next-auth';

// Função para obter todos os animais
export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter parâmetros de consulta
    const url = new URL(request.url);
    const fazenda = url.searchParams.get('fazenda');
    const tipo = url.searchParams.get('tipo');
    const status = url.searchParams.get('status');
    const limite = parseInt(url.searchParams.get('limite') || '100');
    const pagina = parseInt(url.searchParams.get('pagina') || '1');
    
    // Construir filtro
    const filtro: any = { ativo: true };
    
    if (fazenda) filtro.fazenda = fazenda;
    if (tipo) filtro.tipo = tipo;
    if (status) filtro.status = status;
    
    // Calcular paginação
    const skip = (pagina - 1) * limite;
    
    // Buscar animais
    const animais = await Animal.find(filtro)
      .sort({ dataCadastro: -1 })
      .skip(skip)
      .limit(limite);
    
    // Contar total de registros
    const total = await Animal.countDocuments(filtro);
    
    // Retornar resposta
    return NextResponse.json({
      success: true,
      pagina,
      limite,
      total,
      totalPaginas: Math.ceil(total / limite),
      dados: animais
    });
    
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar animais' },
      { status: 500 }
    );
  }
}

// Função para criar um novo animal
export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const dados = await request.json();
    
    // Validar dados obrigatórios
    if (!dados.identificacao || !dados.tipo || !dados.raca || !dados.dataNascimento || !dados.sexo || !dados.peso || !dados.fazenda) {
      return NextResponse.json(
        { success: false, message: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se já existe um animal com a mesma identificação
    const animalExistente = await Animal.findOne({ identificacao: dados.identificacao });
    
    if (animalExistente) {
      return NextResponse.json(
        { success: false, message: 'Já existe um animal com esta identificação' },
        { status: 400 }
      );
    }
    
    // Criar novo animal
    const novoAnimal = await Animal.create({
      ...dados,
      dataCadastro: new Date(),
      ultimaAtualizacao: new Date(),
      ativo: true
    });
    
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
      { success: false, message: 'Erro ao cadastrar animal' },
      { status: 500 }
    );
  }
} 