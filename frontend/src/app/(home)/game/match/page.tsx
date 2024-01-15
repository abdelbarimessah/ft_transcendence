'use client'
import CountDownTimer from '@/components/CountDowntimer';
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
);

export default function Home() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className='ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1'>
    {showFirstComponent ? (
      <CountDownTimer />
      ) : (
        <DynamicComponentWithNoSSR />
        )}
  </div>
  );
}

