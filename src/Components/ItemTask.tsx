import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { TodoItem } from './TodoListForm';
import ModalGif from './ModalGif';

interface ItemTaskProps {
  todo: TodoItem;
  toggleTodoCompleted: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}



const ItemTask: React.FC<ItemTaskProps> = ({ todo, toggleTodoCompleted, removeTodo, editTodo }) => {

  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando
  const [editedText, setEditedText] = useState(todo.text); // Estado para el texto editado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [gifUrl, setGifUrl] = useState('');
  
  const API_KEY = 'eGq15rq8J632URnJkwzWZRj5TGcmuesm';

  // Función para obtener un GIF de celebración
  const fetchCelebrationGif = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=celebration&rating=g`
      );
      const { data } = await response.json();
      setGifUrl(data.images.original.url); // Almacena la URL del GIF
      setIsModalOpen(true); // Abre el modal
    } catch (error) {
      console.error('Error al obtener el GIF:', error);
    }
  };

  const handleToggleClick = () => {
    if (!todo.completed) {
      fetchCelebrationGif(); // Llama a la API de Giphy si la tarea se completa
    }
    toggleTodoCompleted(todo.id); // Cambia el estado de completado
  };

  const handleEdit = () => {
    setIsEditing(!isEditing); // Cambia entre editar/no editar
  };

  const handleSave = () => {
    editTodo(todo.id, editedText); // Llama a la función editTodo para actualizar el texto
    setIsEditing(false); // Termina el modo de edición
  };

  return (
    <>
      <div className="flex justify-between border-b py-2">
        {isEditing ? (
          <input
            className="border border-gray-300 rounded-md py-1 px-2"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p className={`font-normal ${todo.completed ? 'line-through text-gray-500 poppins-regular' : ''}`}>
            {todo.text}
          </p>
        )}

        <figure className="flex gap-2 items-center flex-wrap">
          {/* Toggle icon */}
          <FontAwesomeIcon
            className="text-3xl cursor-pointer text-green-400"
            icon={todo.completed ? faToggleOn : faToggleOff}
            onClick={handleToggleClick} // Actualiza el estado al hacer clic
          />

          {/* Edit icon */}
          <FontAwesomeIcon
            className="text-2xl text-blue-500 cursor-pointer"
            icon={faPenToSquare}
            onClick={handleEdit} // Activa/desactiva el modo de edición
          />

          {/* Save button (muestra solo si está en modo edición) */}
          {isEditing && (
            <button
              className="bg-green-500 text-white py-1 px-2 rounded-md"
              onClick={handleSave}
            >
              Guardar
            </button>
          )}

          {/* Trash icon - llama a la función removeTodo al hacer clic */}
          <FontAwesomeIcon
            className="text-2xl text-red-500 cursor-pointer"
            icon={faTrashCan}
            onClick={() => removeTodo(todo.id)} // Elimina la tarea
          />
        </figure>
      </div>

      {/* Modal para mostrar el GIF */}
      {isModalOpen && <ModalGif gifUrl={gifUrl} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default ItemTask
