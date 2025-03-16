import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Financeiro from '@/app/models/Financeiro';

// Função para obter registros financeiros
export async function GET(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter parâmetros de consulta
    const url = new URL(request.url);
    const fazenda = url.searchParams.get('fazenda');
    const tipo = url.searchParams.get('tipo');
    const categoria = url.searchParams.get('categoria');
    const status = url.searchParams.get('status');
    const dataInicio = url.searchParams.get('dataInicio');
    const dataFim = url.searchParams.get('dataFim');
    const limite = parseInt(url.searchParams.get('limite') || '100');
    const pagina = parseInt(url.searchParams.get('pagina') || '1');
    
    // Construir filtro
    const filtro: any = {};
    
    if (fazenda) filtro.fazenda = fazenda;
    if (tipo) filtro.tipo = tipo;
    if (categoria) filtro.categoria = categoria;
    if (status) filtro.status = status;
    
    // Filtro por data
    if (dataInicio || dataFim) {
      filtro.data = {};
      if (dataInicio) filtro.data.$gte = new Date(dataInicio);
      if (dataFim) filtro.data.$lte = new Date(dataFim);
    }
    
    // Calcular paginação
    const skip = (pagina - 1) * limite;
    
    // Buscar registros financeiros
    const registros = await Financeiro.find(filtro)
      .populate('animal', 'identificacao tipo')
      .sort({ data: -1 })
      .skip(skip)
      .limit(limite);
    
    // Contar total de registros
    const total = await Financeiro.countDocuments(filtro);
    
    // Calcular totais
    const receitas = await Financeiro.aggregate([
      { $match: { ...filtro, tipo: 'Receita' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    
    const despesas = await Financeiro.aggregate([
      { $match: { ...filtro, tipo: 'Despesa' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    
    const totalReceitas = receitas.length > 0 ? receitas[0].total : 0;
    const totalDespesas = despesas.length > 0 ? despesas[0].total : 0;
    const saldo = totalReceitas - totalDespesas;
    
    // Retornar resposta
    return NextResponse.json({
      success: true,
      pagina,
      limite,
      total,
      totalPaginas: Math.ceil(total / limite),
      resumo: {
        receitas: totalReceitas,
        despesas: totalDespesas,
        saldo
      },
      dados: registros
    });
    
  } catch (error) {
    console.error('Erro ao buscar registros financeiros:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar registros financeiros' },
      { status: 500 }
    );
  }
}

// Função para criar um novo registro financeiro
export async function POST(request: NextRequest) {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Obter dados do corpo da requisição
    const dados = await request.json();
    
    // Validar dados obrigatórios
    if (!dados.tipo || !dados.categoria || !dados.descricao || !dados.valor || !dados.data || !dados.formaPagamento || !dados.status || !dados.fazenda || !dados.responsavel) {
      return NextResponse.json(
        { success: false, message: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }
    
    // Criar novo registro financeiro
    const novoRegistro = await Financeiro.create({
      ...dados,
      dataCadastro: new Date()
    });
    
    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Registro financeiro cadastrado com sucesso',
      registro: novoRegistro
    });
    
  } catch (error: any) {
    console.error('Erro ao cadastrar registro financeiro:', error);
    
    // Verificar se é um erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((err: any) => err.message);
      
      return NextResponse.json(
        { success: false, message: mensagens.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Erro ao cadastrar registro financeiro' },
      { status: 500 }
    );
  }
} 