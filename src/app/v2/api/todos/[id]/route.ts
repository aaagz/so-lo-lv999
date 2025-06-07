import { NextRequest, NextResponse } from 'next/server';
import { UpdateTodoRequest } from '../../../types';
import { todoStore } from '../../../lib/todoStore';

// GET /v2/api/todos/[id] - Get a specific todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todo = todoStore.getTodoById(id);

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ todo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /v2/api/todos/[id] - Update a specific todo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateTodoRequest = await request.json();

    // Validate text if it's being updated
    if (body.text !== undefined && body.text.trim() === '') {
      return NextResponse.json(
        { error: 'Todo text cannot be empty' },
        { status: 400 }
      );
    }

    const updates = {
      ...(body.text !== undefined && { text: body.text.trim() }),
      ...(body.completed !== undefined && { completed: body.completed }),
      updatedAt: new Date().toISOString(),
    };

    const updatedTodo = todoStore.updateTodo(id, updates);

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ todo: updatedTodo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /v2/api/todos/[id] - Delete a specific todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedTodo = todoStore.deleteTodo(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ todo: deletedTodo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
