import { Todo } from '../../../types'

// In-memory database for todos
let todos: Todo[] = []

// Generate a unique ID for a new todo
const generateId = () => Math.random().toString(36).substring(2, 11)

export const getTodos = () => todos

export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: generateId(),
    text,
    completed: false
  }
  todos = [...todos, newTodo]
  return newTodo
}

export const updateTodo = (id: string, text: string): Todo => {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, text } : todo
  )
  return todos.find(todo => todo.id === id)!
}

export const deleteTodo = (id: string) => {
  todos = todos.filter(todo => todo.id !== id)
}

export const toggleTodoComplete = (id: string): Todo => {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  return todos.find(todo => todo.id === id)!
}
