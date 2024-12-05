import MotionNumber from 'motion-number';
import { useEffect, useState } from 'react';

type TimeUnit = {
  hours: number;
  minutes: number;
  seconds: number;
};

const TimeDisplay = ({ isFrench }: { isFrench: boolean }) => {
  const [time, setTime] = useState<TimeUnit>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const formatTime = () => {
      const now = new Date().toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour12: false,
      });

      const parisTime = new Date(now);

      return {
        hours: parisTime.getHours(),
        minutes: parisTime.getMinutes(),
        seconds: parisTime.getSeconds(),
      };
    };

    setTime(formatTime());

    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const numberFormat = {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const hours = isFrench ? time.hours : time.hours % 12 || 12;

  return (
    <div className="flex items-baseline gap-1">
      {isFrench ? 'IL EST ' : 'IT IS '}
      <MotionNumber className="inline-block w-6" format={numberFormat} value={hours} />
      :
      <MotionNumber className="inline-block w-6" format={numberFormat} value={time.minutes} />
      :
      <MotionNumber className="inline-block w-6" format={numberFormat} value={time.seconds} />
      {!isFrench && ` ${time.hours >= 12 ? 'PM' : 'AM'}`}
      {isFrench ? ' ICI !' : ' HERE!'}
    </div>
  );
};

export default TimeDisplay;
