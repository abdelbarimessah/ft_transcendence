'use client'
import ParticleBackground from '@/components/Tsparticles';
import Image from 'next/image'

function login() {
    const randomMode = () => {
        console.log(' in the login page  ');
    };
    return (
        <>
            <div className="w-full max-h-screen h-screen relative   bg-color-18 flex justify-center items-center  overflow-auto  scrollbar-hide">
                <ParticleBackground />
                <div onClick={randomMode} className=" z-50 bg-color-0 w-[306px] h-[66px] rounded-[15px] flex gap-[15px] items-center justify-center cursor-pointer">
                    <div>
                        <p className='text-black font-medium font-poppins text-[28px]'>Sign in with</p>
                    </div>
                    <div>
                        <Image
                            src="/../../assets/intraLogo.svg"
                            alt="My Gallery Image"
                            height={50}
                            width={50}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default login;