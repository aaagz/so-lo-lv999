import { NextResponse } from 'next/server'
import { getTodos, updateTodo, deleteTodo, toggleTodoComplete } from './db'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { text } = await request.json()
  const updated = updateTodo(params.id, text)
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  deleteTodo(params.id)
  return NextResponse.json({ message: 'Todo deleted' })
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { completed } = await request.json()
  const updated = toggleTodoComplete(params.id)
  return NextResponse.json(updated)
}
