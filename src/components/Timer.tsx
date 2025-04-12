import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeEnd }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeEnd();
    }
  }, [timeRemaining, onTimeEnd]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <TimerIcon className="w-6 h-6 text-blue-600" />
      <span className={timeRemaining <= 5 ? 'text-red-500' : 'text-blue-600'}>
        {timeRemaining}s
      </span>
    </div>
  );
};

export default Timer;