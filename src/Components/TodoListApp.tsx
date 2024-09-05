import ItemTask from "./ItemTask"
import { TodoItem } from './TodoListForm';

interface TodoListAppProps {
  todos: TodoItem[];
  toggleTodoCompleted: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoListApp: React.FC<TodoListAppProps> = ({ todos, toggleTodoCompleted, removeTodo, editTodo }) => {
  return (
    <>
      <section className="w-[30rem] h-60 border-x border-gray-300 px-5 overflow-y-auto overflow-x-hidden">
        {todos.map((todo) => (
          <ItemTask key={todo.id} todo={todo} toggleTodoCompleted={toggleTodoCompleted}  removeTodo={removeTodo} editTodo={editTodo} />
        ))}
      </section>
    </>
  )
}

export default TodoListApp
