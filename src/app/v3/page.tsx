'use client'
import { useState, useEffect } from 'react'
import { Todo } from './api/todos/db'

export default function V3Page() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetch('/api/v3/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const addTodo = async () => {
    if (!newTodo) return
    const res = await fetch('/api/v3/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo })
    })
    const todo = await res.json()
    setTodos([...todos, todo])
    setNewTodo('')
  }

  const updateTodo = async (id: string, text: string) => {
    const res = await fetch(`/api/v3/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const updatedTodo = await res.json()
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text, completed: updatedTodo.completed } : todo
    ))
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/v3/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = async (id: string) => {
    const res = await fetch(`/api/v3/todos/${id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        completed: !todos.find(todo => todo.id === id)?.completed 
      })
    })
    const updatedTodo = await res.json()
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
    ))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App (v3)</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 mr-2"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white p-2"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2"
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
              className="border p-2 flex-grow"
            />
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
