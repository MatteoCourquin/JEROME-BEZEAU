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
      const date = new Date();
      const parisTime = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));

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
    useGrouping: false,
  };

  const hours = isFrench ? time.hours : time.hours % 12 || 12;

  return (
    <div className="flex items-center gap-1">
      {isFrench ? 'IL EST ' : 'IT IS '}
      <p className="text-black">
        <MotionNumber className="inline-block w-6" format={numberFormat} value={hours} />
        :
        <MotionNumber className="inline-block w-6" format={numberFormat} value={time.minutes} />
        :
        <MotionNumber className="inline-block w-6" format={numberFormat} value={time.seconds} />
      </p>
      {!isFrench && ` ${time.hours >= 12 ? 'PM' : 'AM'}`}
      {isFrench ? ' ICI !' : ' HERE!'}
    </div>
  );
};

export default TimeDisplay;
