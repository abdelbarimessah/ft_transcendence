import { useState, useEffect } from 'react';
import styles from './ModeCard.module.css'

const CountDownTimer = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease countdown every second
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='h-full w-full  flex items-center justify-center'>
      <p className={` ${styles.playCard} text-color-0 font-nico-moji text-[200px]  `}>{countdown} </p>
    </div>
  );
};

export default CountDownTimer;