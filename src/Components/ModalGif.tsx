import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';

const ModalGif: React.FC<{ gifUrl: string; onClose: () => void }> = ({ gifUrl, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg relative max-w-md w-full mx-auto">
        <button
          className="absolute text-lg top-0 right-1 text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={ faXmark } />
        </button>
        <section className='flex flex-col items-center gap-2'>
            <h2 className='text-center poppins-regular'><span className='font-bold poppins-bold'>¡Felicidades!</span> <br /> ¡Has completado una tarea!</h2>
            <img src={gifUrl} alt="Celebration" className="w-full h-auto" />
        </section>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default ModalGif;
