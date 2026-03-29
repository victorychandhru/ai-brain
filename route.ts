
import { chatFlow } from '@/ai/flows/chat-flow';
import { NextResponse } from 'next/server';

/**
 * @fileOverview Simple Node.js API endpoint for chat.
 * Provides access via POST /api/chat
 */

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const response = await chatFlow(message);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
