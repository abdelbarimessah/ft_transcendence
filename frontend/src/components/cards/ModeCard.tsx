'use client'
import styles from './ModeCard.module.css'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Lottie from 'lottie-react';
import animationData from '../../../public/assets/animation.json';

var socketClient = io('http://localhost:3000');

function ModeCard(props: any) {
    const router = useRouter()
    const [isRandomMode, setIsRandomMode] = useState(false)

    const randomMode = () => {
        setIsRandomMode(true)
        console.log('random mode called from the button click ');
        socketClient.emit('joinRoomFromCard');
    };

    useEffect(() => {
        socketClient.on('enterRoomFromCard', (data) => {
            // console.log('socket is called for random mode');
            console.log('the room name is ' + data.roomName );
            router.push('/game/match', { scroll: false })
        });
    }, [isRandomMode])

    const removeRandomMode = () => {
        setIsRandomMode(false)
        socketClient.emit('customDisconnectClient');
    }
    return (
        <>
            <div className={` ${isRandomMode ? 'blur' : ''}  w-full max-h-full flex flex-wrap items-center justify-center gap-[24px] pb-10 pt-10 `}>
                <div className={` ${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-100 `}>
                    <Image
                        src="/../../assets/2.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                        priority={true}
                    />
                    {/* <img src="/../../assets/2.jpg" alt="random mode image card" /> */}
                    <div className='bg-color-18 w-full h-[202px] absolute bottom-0 left-0 '>
                        <div className='h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center '>
                            <div className='w-full'>
                                <p className='text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase '>AI mode</p>
                            </div>
                            <div className=' flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full'>
                                <div className='flex gap-[8px] items-center justify-center'>
                                    <div className="rounded-full bg-color-8 h-10 w-10 flex justify-center items-center">
                                        <img src="../assets/AiAvatar.svg" className="h-8 w-8 text-white m-auto" alt="Vector" />
                                    </div>
                                    <div className='flex flex-col '>
                                        <p className="text-[18px] text-color-3 font-poppins font-[400]" >ALPHA ZERO</p>
                                        <p className="text-[16px] text-color-16 font-poppins font-[300]" >AI</p>
                                    </div>

                                </div>
                                <div className='h-full flex items-center justify-center'>
                                    <button
                                        className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3`}
                                    >
                                        play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px]  rounded-[30px] overflow-hidden flex relative hover:opacity-90 `}>
                    <Image
                        src="/../../assets/3.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                    />
                    <div className='bg-color-18 w-full h-[202px] absolute bottom-0 left-0 '>
                        <div className='h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center '>
                            <div className='w-full '>
                                <p className='text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase '>Random mode</p>
                            </div>
                            <div className=' flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full'>
                                <div className='flex gap-[8px] items-center justify-center'>
                                    <div>
                                        <ul className="flex flex-wrap ">
                                            <li >
                                                <div className=''>
                                                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-1 border-wihte"></img>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='-ml-7'>
                                                    <img src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-1  border-white"></img>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='-ml-7'>
                                                    <img src="https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-1  border-white"></img>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[18px] text-color-3 font-poppins font-[400]" >100 players</p>
                                        <p className="text-[16px] text-color-16 font-poppins font-[300]" >Online</p>
                                    </div>

                                </div>
                                <div className='h-full flex items-center'>
                                    <button
                                        onClick={randomMode}
                                        className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3`}
                                    >
                                        play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.playCard} cursor-pointer xl:mb-0 w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-90 `}>
                    <Image
                        src="/../../assets/4.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                    />
                    <div className='bg-color-18 w-full h-[202px] absolute bottom-0 left-0 '>
                        <div className='h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center '>
                            <div className='w-full '>
                                <p className='text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase '>FRIENDS MODE</p>
                            </div>
                            <div className=' flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full'>
                                <div className='flex gap-[8px] items-center justify-center'>
                                    <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center">
                                        <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[18px] text-color-3 font-poppins font-[400]" >Play with your</p>
                                        <p className="text-[16px] text-color-16 font-poppins font-[300]">Friend</p>
                                    </div>
                                </div>
                                <div className='h-full flex items-center'>
                                    <button
                                        className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3`}
                                    >
                                        play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isRandomMode && (
                <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50'>
                    <Lottie
                        autoPlay
                        loop
                        style={{ width: 300 }} animationData={animationData}
                    />
                    <div onClick={removeRandomMode} className=' cursor-pointer w-[50px] h-[50px] bg-white fixed top-10 right-10 flex items-center justify-center z-50 rounded-[17px] '>
                        <img src="../../assets/cross1.svg" alt="" />
                    </div>
                    <button className=''></button>
                </div>
            )}
        </>
    );
}

export default ModeCard;

function redirectToPage(arg0: string) {
    throw new Error('Function not implemented.');
}
