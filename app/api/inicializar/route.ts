import { NextRequest, NextResponse } from 'next/server';
import { inicializarDados } from '@/app/lib/seed';

/**
 * API para inicializar o banco de dados
 * GET /api/inicializar
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar código secreto para segurança (opcional)
    const { searchParams } = new URL(request.url);
    const codigo = searchParams.get('codigo');
    
    // Código de proteção para evitar que qualquer pessoa inicialize o banco
    // Em produção, use um código mais seguro
    if (codigo !== 'gadogest_inicializar_2024') {
      return NextResponse.json(
        { success: false, message: 'Código de acesso inválido.' },
        { status: 401 }
      );
    }
    
    // Inicializar dados
    await inicializarDados();
    
    return NextResponse.json({
      success: true,
      message: 'Banco de dados inicializado com sucesso!',
      usuarioAdmin: {
        email: 'admin@gadogest.com',
        senha: 'admin123'
      }
    });
    
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao inicializar banco de dados.' },
      { status: 500 }
    );
  }
} 