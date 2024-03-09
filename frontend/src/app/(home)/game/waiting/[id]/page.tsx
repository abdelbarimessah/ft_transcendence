'use client'
import Lottie from 'lottie-react'
import animationData from '../../../../../../public/assets/Animation.json';
import { useEffect, useState } from 'react';
import { PlayerPairing } from '../../../../../components/cards/ModeCard'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ParticleBackground from '@/components/particles/Tsparticles';
import { useContext } from 'react';
import { SocketContext } from '@/app/SocketContext';
import Image from 'next/image';
import { toast } from 'sonner';


axios.defaults.withCredentials = true;



export default function Waiting() {
    const socketClient = useContext(SocketContext);

    const [isRandomMode, setIsRandomMode] = useState(true)




    const [player1, setPlayer1] = useState<any>();
    const [player2, setplayer2] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        socketClient.on('inviteCallback', (data) => {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${data.receiver.providerId}`).then(res => {
                setplayer2(res.data);
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
            })
        })
    })

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`).then(res => {
            setPlayer1(res.data);
        }).catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
        })
    }, [])


    useEffect(() => {
        socketClient.on('OtherPlayerDeclineTheGame', (data) => {
            toast.error('The other player declined your invitation')
            router.push('/profile');
        })
    }, [socketClient, router])


    useEffect(() => {
        socketClient.on("playersReadyInvite", (data) => {
            setTimeout(() => {
                router.push(
                    `/game/match?room=InviteRoom-${data.sender.providerId}-${data.receiver.providerId}-${data.inviteNumber}`
                );
            }, 500);
        });
    }, [socketClient, router]);


    useEffect(() => {
        socketClient.on("OtherPlayerDeclineTheGame", (data) => {
            router.push("/profile");
        });
    }, [socketClient, router]);

    const removeInvitemMode = () => {
        setIsRandomMode(false);
        router.push("/profile");
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative">
            <div className="w-full h-full absolute ">
                <ParticleBackground />
            </div>
            {isRandomMode && player1 && player2 && (
                <div className="w-full h-full`">
                    <div className="w-full h-[300px] flex items-center justify-center  relative">
                        <Lottie
                            autoPlay
                            loop
                            style={{ width: 300 }}
                            animationData={animationData}
                        />
                    </div>
                    <div className=" w-full h-[200px] relative flex items-center justify-center ">
                        <PlayerPairing player1={player1} player2={player2} />
                    </div>
                    <div
                        onClick={removeInvitemMode}
                        className=" cursor-pointer w-[50px] h-[50px] bg-white fixed top-96 right-52 flex items-center justify-center z-50 rounded-[17px] "
                    >
                        <Image
                            src="../../assets/cross1.svg"
                            alt="crossIcon"
                            height={20}
                            width={20}
                            priority={true}
                            draggable={false}
                        ></Image>
                    </div>
                </div>
            )}
        </div>
    );
}