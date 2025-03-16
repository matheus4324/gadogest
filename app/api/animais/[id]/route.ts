import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Animal from '@/app/models/Animal';

/**
 * Obter um animal específico pelo ID
 * GET /api/animais/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const id = params.id;
    
    // Buscar animal
    const animal = await Animal.findById(id);
    
    if (!animal) {
      return NextResponse.json(
        { success: false, message: 'Animal não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      animal
    });
  } catch (error) {
    console.error('Erro ao buscar animal:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar animal' },
      { status: 500 }
    );
  }
}

/**
 * Atualizar um animal específico
 * PUT /api/animais/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const id = params.id;
    const dados = await request.json();
    
    // Verificar se o animal existe
    const animal = await Animal.findById(id);
    
    if (!animal) {
      return NextResponse.json(
        { success: false, message: 'Animal não encontrado' },
        { status: 404 }
      );
    }
    
    // Atualizar animal
    const animalAtualizado = await Animal.findByIdAndUpdate(
      id,
      { ...dados, ultimaAtualizacao: new Date() },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Animal atualizado com sucesso',
      animal: animalAtualizado
    });
  } catch (error: any) {
    console.error('Erro ao atualizar animal:', error);
    
    // Verificar se é um erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((err: any) => err.message);
      
      return NextResponse.json(
        { success: false, message: mensagens.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Erro ao atualizar animal' },
      { status: 500 }
    );
  }
}

/**
 * Excluir um animal
 * DELETE /api/animais/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const id = params.id;
    
    // Verificar se o animal existe
    const animal = await Animal.findById(id);
    
    if (!animal) {
      return NextResponse.json(
        { success: false, message: 'Animal não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluir animal
    await Animal.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Animal excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir animal:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao excluir animal' },
      { status: 500 }
    );
  }
} 