'use client'
import styles from './ModeCard.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import animationData from '../../../public/assets/Animation.json';
import { useContext } from 'react';
import { SocketContext } from '@/app/SocketContext';
import Link from 'next/link';
import { toast } from 'sonner';


import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


function ModeCard(me: any) {

    const socketClient = useContext(SocketContext);
    const [roomName, setRoomName] = useState('')
    const [playerPairingState, setPlayerPairingState] = useState(false);
    const router = useRouter()
    const [isRandomMode, setIsRandomMode] = useState(false)
    const [opponent, setOpponent] = useState(null);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const randomMode = () => {
        setIsRandomMode(true)
        socketClient.emit('joinRoomFromCard');
    };

    const removeRandomMode = () => {
        setIsRandomMode(false)
        socketClient.emit('handleRemoveFromQueue');
    }

    useEffect(() => {
        const enterRoom = (data: any) => {
            setRoomName(data.roomName);
            if (data.player1.providerId === me.me.providerId) {
                setPlayer1(data.player1);
                setPlayer2(data.player2);
            }
            else {
                setPlayer1(data.player2);
                setPlayer2(data.player1);
            }
            setPlayerPairingState(true);
            setIsRandomMode(false)
            setTimeout(() => {
                router.push(`/game/match?room=${data.roomName}`);
            }, 4000);
        };
        socketClient.on('enterRoomFromCard', enterRoom);

        return () => {
            socketClient.off('enterRoomFromCard', enterRoom);
        }
    }, [isRandomMode, router, socketClient, roomName]);

    useEffect(() => {
        const yourOpponent = (data: any) => {
            setOpponent(data);
        };
        socketClient.on('yourOpponent', yourOpponent);

        return () => {
            socketClient.off('yourOpponent', yourOpponent);
        }
    }, [socketClient]);

    useEffect(() => {
        socketClient.on('youAreInGameFromAntherPage', () => {
            console.log('youAreInGameFromAntherPage [12213231]');
            toast.error('you are already in game');
            router.push('/profile')
        })
    });



    return (
        <>
            <div className={` ${isRandomMode || playerPairingState ? 'blur' : ''} select-none   w-full max-h-full flex flex-wrap items-center justify-center gap-[24px] pb-10 pt-10 `}>
                <div className={` ${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-90 hover:scale-[1.01] `}>
                    <Image
                        src="/../../assets/2.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                        priority={true}
                        draggable={false}
                    />
                    <div className='bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 '>
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
                                <div className='h-full flex items-center justify-center '>
                                    <Link
                                        href="/game/aiMode"
                                    >
                                        <div
                                            className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3 flex text-center items-center justify-center`}
                                        >
                                            play
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px]  rounded-[30px] overflow-hidden flex relative hover:opacity-90  hover:scale-[1.01]`}>
                    <Image
                        src="/../../assets/3.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                        draggable={false}
                    />
                    <div className='bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 '>
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
                                                    <Image
                                                        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
                                                        alt="modeCardImage person"
                                                        height={40}
                                                        width={40}
                                                        draggable={false}
                                                        property='true'
                                                        className='rounded-full'
                                                    >
                                                    </Image>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='-ml-7'>
                                                    <Image
                                                        src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
                                                        alt="modeCardImage person"
                                                        height={40}
                                                        width={40}
                                                        draggable={false}
                                                        property='true'
                                                        className='rounded-full'
                                                    >
                                                    </Image>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='-ml-7'>
                                                    <Image
                                                        src="https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
                                                        alt="modeCardImage person"
                                                        height={40}
                                                        width={40}
                                                        draggable={false}
                                                        property='true'
                                                        className='rounded-full'
                                                    >
                                                    </Image>
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
                <div className={`${styles.playCard} cursor-pointer xl:mb-0 w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-90  hover:scale-[1.01]`}>
                    <Image
                        src="/../../assets/4.jpg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                        draggable={false}
                    />
                    <div className='bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 '>
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
                <div className='fixed ml-20 top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000]'>
                    <Lottie
                        autoPlay
                        loop
                        style={{ width: 300 }} animationData={animationData}
                    />
                    <div onClick={removeRandomMode} className=' cursor-pointer w-[50px] h-[50px] bg-white fixed top-32 right-32 flex items-center justify-center z-50 rounded-[17px] '>
                        <Image
                            src="../../assets/cross1.svg"
                            alt="My Gallery Image"
                            width={25}
                            height={25}
                            className='object-cover'
                            draggable={false}
                        />
                    </div>
                </div>
            )}
            {playerPairingState && (
                <PlayerPairing player1={player1} player2={player2} />
            )}
        </>
    );
}

export default ModeCard;



function PlayerPairing({ player1, player2 }: any) {
    return (
        <div className='select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className="w-[475px] h-[185px] bg-color-30 rounded-[22px] overflow-hidden relative ">
                <div className="absolute z-0 h-full w-[256px] rounded-s-[22px] flex items-center justify-center overflow-hidden left-0 ">
                    <Image
                        src="/../../assets/rectangleShape.svg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover'
                        priority={true}
                        draggable={false}
                    />
                </div>
                <div className="w-full  z-1 absolute flex items-center justify-center gap-[45px] pt-5">
                    <div className="w-[80px] h-[80px] bg-color-2 rounded-full relative overflow-hidden">

                        <Image
                            src={player1.avatar}
                            alt="player 1 avatar"
                            fill={true}
                            className='object-cover'
                            sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                            priority={true}
                            draggable={false}
                        />
                    </div>
                    <div className="w-[42px] h-[35px] flex items-center justify-center overflow-hidden relative">
                        <Image
                            src="/../../assets/vsIcon.svg"
                            alt="My Gallery Image"
                            fill={true}
                            className='object-cover'
                            sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                            priority={true}
                            draggable={false}
                        />
                    </div>
                    <div className="w-[80px] h-[80px] bg-color-2 rounded-full relative overflow-hidden ">
                        <Image
                            src={player2.avatar}
                            alt="player 2 avatar"
                            fill={true}
                            className='object-cover'
                            sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                            priority={true}
                            draggable={false}
                        />
                    </div>
                </div>
                <div className="z-10 absolute flex items-center justify-center top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-20">
                    <div className="w-[150px] h-[50px] bg-color-30 rounded-[10px] flex items-center justify-center flex-col">
                        <span className="font-nico-moji text-[#949494] text-[12px] capitalize">{` ${player1.firstName} ${player1.lastName}`}</span>
                        <span className="font-nico-moji text-[#C7C7C7] text-[9px] -mt-1 capitalize ">@{`${player1.nickName}`}</span>
                    </div>
                    <div className="w-[150px] h-[50px] bg-color-6 rounded-[10px] flex items-center justify-center flex-col">
                        <span className="font-nico-moji text-[#949494] text-[12px] capitalize">{` ${player2.firstName} ${player2.lastName}`}</span>
                        <span className="font-nico-moji text-[#C7C7C7] text-[9px] -mt-1 capitalize ">@{`${player2.nickName}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { PlayerPairing }