import { Todo } from '../types';

// In-memory storage for demo purposes
// In a real app, you'd use a database
class TodoStore {
  private todos: Todo[] = [
    {
      id: '1',
      text: 'Learn Next.js',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      text: 'Build a TODO app',
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    this.todos[index] = { ...this.todos[index], ...updates };
    return this.todos[index];
  }

  deleteTodo(id: string): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    return this.todos.splice(index, 1)[0];
  }
}

// Export a singleton instance
export const todoStore = new TodoStore();
