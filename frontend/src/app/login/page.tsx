'use client'
import ParticleBackground from '@/components/Tsparticles';
import Image from 'next/image'
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function login() {
    const loginIntra = () => {
        console.log(' in the login page  ');
    };
    function loginGoogle (){
        console.log(' in the login page  ');
        // useEffect(() => {
            // axios.get('http://localhost:3000/auth-google/profile')
            //   .then(function (response) {
            //     console.log(response.data);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
        //   }, []);
    };
    return (
        <>
            <div className="w-full max-h-screen h-screen bg-color-18  flex flex-col justify-center items-center relative  overflow-auto  scrollbar-hide">
                <div className='w-full h-full absolute hidden'>
                    <ParticleBackground />
                </div>
                
                <div className=' flex gap-[33px] items-center justify-center'>
                    <div className=' h-[1px] w-[150px] bg-color-0 '>
                    </div>
                    <div>
                        <p className='text-[30px] text-color-0 font-[500] font-poppins'>or</p>
                    </div>
                    <div className=' h-[1px] w-[150px] bg-color-0 '>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-[108px]'>
                    <Link href={'http://localhost:3000/auth/42'}>
                        <div onClick={loginIntra}  className=" z-50 bg-color-0 w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer">
                            <div>
                                <Image
                                    src="/../../assets/intraLogo.svg"
                                    alt="My Gallery Image"
                                    height={45}
                                    width={45}
                                    />
                            </div>
                        </div>
                    </Link>
                    <Link href={'http://localhost:3000/auth/google'}>
                        <div onClick={loginGoogle} className=" z-50 bg-color-0 w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer">
                            <div>
                                <Image
                                    src="/../../assets/googleLogo.svg"
                                    alt="My Gallery Image"
                                    height={45}
                                    width={45}
                                    />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default login;