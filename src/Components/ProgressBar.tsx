import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressBarProps {
  totalTasks: number;
  completedTasks: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalTasks, completedTasks }) => {
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100; // Calcula el porcentaje

  return (
    <>
      <div style={{ width: 200, height: 200, margin: "auto" }}>
        <CircularProgressbar 
          value={percentage} 
          text={`${completedTasks}/${totalTasks}`} 
        />
      </div>
    </>
  );
};

export default ProgressBar;
