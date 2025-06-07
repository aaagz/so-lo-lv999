'use client';

import { useState, useEffect, FormEvent } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = '/api/v1/todos';

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add todo
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to add todo: ${response.status} ${response.statusText} - ${errorData}`);
      }
      const newTodo: Todo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while adding todo');
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update todo: ${response.status} ${response.statusText} - ${errorData}`);
      }
      const updatedTodo: Todo = await response.json();
      setTodos(prevTodos => prevTodos.map(t => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while updating todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete todo: ${response.status} ${response.statusText} - ${errorData}`);
      }
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while deleting todo');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1>My TODO App</h1>
      {isLoading && <p>Loading todos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleAddTodo} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          style={{ flexGrow: 1, padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          aria-label="New todo text"
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add
        </button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <span
              onClick={() => handleToggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer', flexGrow: 1, color: todo.completed ? '#888' : '#333' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}