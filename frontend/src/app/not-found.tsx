import ParticleBackground from '@/components/particles/Tsparticles'
import Link from 'next/link'
import style from './Home.module.css'

export default function NotFound() {


    return (
        <div className={`{${style.card}} bg-color-18 w-screen h-screen select-none`}>
            <div className='w-full h-full absolute '>
                <ParticleBackground />
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center z-50  '>
                <div className='xl:w-[1073px] w-full h-[600px] rounded-[22px] bg-[#E3E3E3]/10 flex items-center justify-between flex-col gap-10 z-50'>
                    <div className=''>
                        <span className='text-[280px] text-color-0 font-nico-moji'>404</span>
                    </div>
                    <div className='flex items-cente justify-center flex-col gap-3 absolute top-[53%] '>
                        <div className='flex items-center justify-center'>
                            <span className='text-color-0 font-nico-moji text-[25px]'>OOPS! There Is Nothing Here !</span>
                        </div>
                        <div className='-mt-3 flex items-center justify-center'>
                            <span className='text-color-6 text-[18px] font-nico-moji'>Sorry, The Page You're Looking For IS Nowhere To Be Seen</span>
                        </div>
                    </div>
                    <Link href={'/profile'}>
                        <div className='w-[320px] h-[70px] bg-color-30  flex items-center justify-center rounded-[22px] mb-10 z-50 hover:scale-[1.01] hover:opacity-90 cursor-pointer'>
                            <span className='text-color-31 font-nico-moji text-[16px] '>Take Me Home</span>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}