import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './output.css';
import TodoListForm from './Components/TodoListForm';
import TodoListTitle from './Components/TodoListTitle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <section className='h-screen relative'>
      <TodoListTitle />
      
      <TodoListForm />

    </section>

  </StrictMode>,
)
