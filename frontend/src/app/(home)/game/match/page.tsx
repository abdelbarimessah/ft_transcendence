'use client'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
);


export default function Home() {
  return (
    <div className='ml-4 mr-3 h-full flex items-center justify-center w-10 flex-1'>
      <DynamicComponentWithNoSSR />
      {/* <DynamicComponentWithNoSSR /> */}
    </div>
  );
}

