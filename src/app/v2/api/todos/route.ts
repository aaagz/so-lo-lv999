import { NextRequest, NextResponse } from 'next/server';
import { Todo, CreateTodoRequest } from '../../types';
import { todoStore } from '../../lib/todoStore';

// GET /v2/api/todos - Get all todos
export async function GET() {
  try {
    const todos = todoStore.getAllTodos();
    return NextResponse.json({ todos }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /v2/api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body: CreateTodoRequest = await request.json();

    if (!body.text || body.text.trim() === '') {
      return NextResponse.json(
        { error: 'Todo text is required' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: Date.now().toString(), // Simple ID generation
      text: body.text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todoStore.addTodo(newTodo);

    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
