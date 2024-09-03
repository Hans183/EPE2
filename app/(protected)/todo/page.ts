import { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = async () => {
    const newTodo = { title, description };
    const response = await axios.post('/api/todos', newTodo);
    setTodos([...todos, response.data]);
    setTitle('');
    setDescription('');
  };

  const updateTodo = async (id: number, completed: boolean) => {
    const response = await axios.put('/api/todos', { id, completed });
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete('/api/todos', { data: { id } });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Todo List</h1>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-3">
            <div>
              <h3 className={`font-bold ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </h3>
              <p>{todo.description}</p>
              <small>
                Created at: {new Date(todo.createdAt).toLocaleString()}
              </small>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => updateTodo(todo.id, !todo.completed)}
                className={`py-1 px-2 rounded ${
                  todo.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {todo.completed ? 'Complete' : 'Incomplete'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
