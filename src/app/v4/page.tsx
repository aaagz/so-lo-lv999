'use client'
import { useState, useEffect } from 'react'
import { Todo } from '../types'

export default function V4Page() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(() => {
    fetch('/api/v3/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const addTodo = async () => {
    const response = await fetch('/api/v3/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText })
    })
    const todo = await response.json()
    setTodos([...todos, todo])
    setNewTodoText('')
  }

  const updateTodo = async (id: string, text: string) => {
    await fetch(`/api/v3/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ))
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/v3/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = async (id: string) => {
    const response = await fetch(`/api/v3/todos/${id}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todos.find(t => t.id === id)?.completed })
    })
    const updatedTodo = await response.json()
    setTodos(todos.map(todo => 
      todo.id === id ? updatedTodo : todo
    ))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App (v4)</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="border p-2 mr-2"
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2"
        >
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="mb-2 p-2 border rounded">
            <div className="flex items-center justify-between">
              <span>{todo.text}</span>
              <div>
                <button 
                  onClick={() => toggleComplete(todo.id)} 
                  className="mr-2 bg-green-500 text-white p-1 rounded"
                >
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
