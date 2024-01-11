'use client'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <div className=" w-full h-screen flex justify-center items-center">
        <div>
          <DynamicComponentWithNoSSR/>
        </div>
      </div>
    </main>
  );
}