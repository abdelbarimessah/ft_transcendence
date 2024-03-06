import { useState, useEffect } from 'react';
import styles from '../cards/ModeCard.module.css'

const CountDownTimer = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='h-full w-full  flex items-center justify-center select-none' >
      <p className={` ${styles.playCard} text-color-0 font-nico-moji text-[200px]  `}>{countdown} </p>
    </div>
  );
};

export default CountDownTimer;