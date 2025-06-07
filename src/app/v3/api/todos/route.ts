import { NextResponse } from 'next/server'
import { getTodos, addTodo } from './db'

export async function GET() {
  return NextResponse.json(getTodos())
}

export async function POST(request: Request) {
  const { text } = await request.json()
  const newTodo = addTodo(text)
  return NextResponse.json(newTodo, { status: 201 })
}
