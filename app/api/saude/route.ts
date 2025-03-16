import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import SaudeAnimal from '@/app/models/SaudeAnimal';
import Animal from '@/app/models/Animal';

// Função para obter registros de saúde
export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter parâmetros de consulta
    const url = new URL(request.url);
    const animalId = url.searchParams.get('animal');
    const tipo = url.searchParams.get('tipo');
    const status = url.searchParams.get('status');
    const dataInicio = url.searchParams.get('dataInicio');
    const dataFim = url.searchParams.get('dataFim');
    const limite = parseInt(url.searchParams.get('limite') || '100');
    const pagina = parseInt(url.searchParams.get('pagina') || '1');
    
    // Construir filtro
    const filtro: any = {};
    
    if (animalId) filtro.animal = animalId;
    if (tipo) filtro.tipo = tipo;
    if (status) filtro.status = status;
    
    // Filtro por data
    if (dataInicio || dataFim) {
      filtro.data = {};
      if (dataInicio) filtro.data.$gte = new Date(dataInicio);
      if (dataFim) filtro.data.$lte = new Date(dataFim);
    }
    
    // Calcular paginação
    const skip = (pagina - 1) * limite;
    
    // Buscar registros de saúde
    const registros = await SaudeAnimal.find(filtro)
      .populate('animal', 'identificacao tipo raca')
      .sort({ data: -1 })
      .skip(skip)
      .limit(limite);
    
    // Contar total de registros
    const total = await SaudeAnimal.countDocuments(filtro);
    
    // Retornar resposta
    return NextResponse.json({
      success: true,
      pagina,
      limite,
      total,
      totalPaginas: Math.ceil(total / limite),
      dados: registros
    });
    
  } catch (error) {
    console.error('Erro ao buscar registros de saúde:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar registros de saúde' },
      { status: 500 }
    );
  }
}

// Função para criar um novo registro de saúde
export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const dados = await request.json();
    
    // Validar dados obrigatórios
    if (!dados.animal || !dados.tipo || !dados.data || !dados.aplicador) {
      return NextResponse.json(
        { success: false, message: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se o animal existe
    const animalExiste = await Animal.findById(dados.animal);
    
    if (!animalExiste) {
      return NextResponse.json(
        { success: false, message: 'Animal não encontrado' },
        { status: 404 }
      );
    }
    
    // Criar novo registro de saúde
    const novoRegistro = await SaudeAnimal.create({
      ...dados,
      dataCadastro: new Date()
    });
    
    // Atualizar status do animal se necessário
    if (dados.atualizarStatusAnimal && dados.novoStatusAnimal) {
      await Animal.findByIdAndUpdate(dados.animal, {
        status: dados.novoStatusAnimal,
        ultimaAtualizacao: new Date()
      });
    }
    
    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Registro de saúde cadastrado com sucesso',
      registro: await SaudeAnimal.findById(novoRegistro._id).populate('animal', 'identificacao tipo raca')
    });
    
  } catch (error: any) {
    console.error('Erro ao cadastrar registro de saúde:', error);
    
    // Verificar se é um erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((err: any) => err.message);
      
      return NextResponse.json(
        { success: false, message: mensagens.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Erro ao cadastrar registro de saúde' },
      { status: 500 }
    );
  }
} 