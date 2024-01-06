import ParticleBackground from '@/components/Tsparticles'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section id="home" className="relative flex flex-col justify-center h-[100vh] bg-cover bg-fixed bg-color-13">
        <ParticleBackground />
      </section>
      <section className='bg-black min-w-screen min-h-screen'>
      </section>
    </>
  )
}