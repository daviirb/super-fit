// app/api/webhook/route.js
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    const body = await req.json();
    console.log('Webhook recebido:', body);

    // Processar os dados conforme necessário

    return NextResponse.json(
      { message: 'Webhook recebido com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: 'Método não permitido' },
    { status: 405 },
  );
}
