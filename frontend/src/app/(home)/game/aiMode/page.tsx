'use client'
import CountDownTimer from '@/components/game/CountDowntimer';
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
// const DynamicComponentWithNoSSR = dynamic(
//   () => import('./game'),
//   { ssr: false }
// );

import DynamicComponentWithNoSSR from './aiMode';

export default function Home() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
      <div className='mx-0 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 h-full flex items-center justify-center w-10 flex-1'>
          <DynamicComponentWithNoSSR />
      </div>
  );
}

