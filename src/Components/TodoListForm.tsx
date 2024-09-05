import { useState, useEffect } from 'react';
import TodoListApp from './TodoListApp';
import ProgressBar from './ProgressBar';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListForm = () => {

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Función para guardar en sessionStorage
  const saveToSessionStorage = (todos: TodoItem[]) => {
    sessionStorage.setItem('todos', JSON.stringify(todos)); // Guardar como string en sessionStorage
  };

  // Recupera los todos desde el sessionStorage al cargar el componente
  useEffect(() => {
    const savedTodos = sessionStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos)); // Parsear y establecer en el estado
    }
  }, []);

  const addTodo = () => {
    if (newTodo !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      setNewTodo('');
      saveToSessionStorage(updatedTodos);
    }
  };

  // Función para editar una tarea
  const editTodo = (id: string, newText: string) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    saveToSessionStorage(updatedTodos);
  };

   // Función para eliminar una tarea
   const removeTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveToSessionStorage(updatedTodos);
  };

  // Función para actualizar el estado de una tarea
  const toggleTodoCompleted = (id: string) => {
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToSessionStorage(updatedTodos);
  };

  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;

  return (
    <>
      <section className="flex gap-2 flex-wrap justify-center">
        <form className="w-80 flex flex-col gap-3">
          <input className="border border-gray-200 rounded-md py-1 px-2 placeholder-gray-700 poppins-regular"  
            type="text" 
            name="inputTask" 
            id="inputTask" 
            placeholder="Nueva Tarea"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          

          <button 
            onClick={addTodo} 
            type="button" 
            className="bg-colorBtn hover:bg-colorBtnHover text-white rounded-md font-semibold poppins-semibold py-1 text-sm transition-all">
            Registrar tarea
          </button>
        </form>
        <TodoListApp 
            todos={todos} 
            toggleTodoCompleted={toggleTodoCompleted} 
            removeTodo={removeTodo} 
            editTodo={editTodo}
        />

        <ProgressBar totalTasks={totalTasks} completedTasks={completedTasks} />
      </section>
    </>
  );
}

export default TodoListForm
