'use client'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <div className="absolute top-0 w-full h-full">
        <DynamicComponentWithNoSSR/>
      </div>
    </main>
  );
}