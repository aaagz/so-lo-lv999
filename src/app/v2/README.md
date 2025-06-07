# TODO App v2

A complete TODO application built with Next.js 15, featuring a modern UI and RESTful API endpoints.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos inline
- ✅ Delete todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Real-time todo count
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API endpoints

## Routes

### Frontend
- **GET /v2** - Main TODO application page

### API Endpoints

#### Todos Collection
- **GET /v2/api/todos** - Get all todos
- **POST /v2/api/todos** - Create a new todo

#### Individual Todo
- **GET /v2/api/todos/[id]** - Get a specific todo
- **PUT /v2/api/todos/[id]** - Update a specific todo
- **DELETE /v2/api/todos/[id]** - Delete a specific todo

## API Usage Examples

### Get all todos
```bash
curl -X GET http://localhost:3006/v2/api/todos
```

### Create a new todo
```bash
curl -X POST http://localhost:3006/v2/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Learn Next.js"}'
```

### Update a todo
```bash
curl -X PUT http://localhost:3006/v2/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:3006/v2/api/todos/1
```

## Data Structure

### Todo Object
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### API Request/Response Types
```typescript
interface CreateTodoRequest {
  text: string;
}

interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}
```

## File Structure

```
src/app/v2/
├── page.tsx              # Main TODO app component
├── types.ts              # TypeScript interfaces
├── lib/
│   └── todoStore.ts      # In-memory data store
└── api/
    └── todos/
        ├── route.ts      # GET /POST todos collection
        └── [id]/
            └── route.ts  # GET/PUT/DELETE individual todo
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **Fetch API** - HTTP requests

## Notes

- Data is stored in memory and will reset when the server restarts
- For production use, replace the in-memory store with a database
- The app includes error handling and loading states
- All API endpoints return JSON responses with appropriate HTTP status codes
