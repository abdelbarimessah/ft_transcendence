'use client'
import axios from 'axios';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { SocketContext } from '@/app/SocketContext';

type Leader = {
    firstName: string;
    providerId: string;
    nickName: string;
    lastName: string;
    level: number;
    avatar: string;
};

export default function LeaderBoard() {
    const [isLoading, setIsLoading] = useState(true);
    const socketClient = useContext(SocketContext)
    const [leaders, setLeaders] = useState<Leader[]>([]);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/leaders`, {withCredentials: true})
            .then(res => {
                setLeaders(res.data.leader);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err.message);
            });
    }, []);

    useEffect(() => {
        socketClient.on('updateInfo', (data) => {
            axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/user/leaders`, {
                withCredentials: true,
              })
              .then((res) => {
                setLeaders(res.data.leader);
                setIsLoading(false);
              })
              .catch((err) => {
                setIsLoading(false);
                console.error(err.message);
              });
        })
    })

    return (
        <div className=" w-full 2xl:w-[596px] xl:w-[1137px] h-[386px] rounded-[22px] bg-color-0 overflow-hidden flex flex-col gap-[40px] px-3">
            <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
                <div className='w-[37px] h-[37px]  relative hidden sm:flex items-center justify-center  '>
                    <Image
                        src="/../../assets/LeaderboardIcon.svg"
                        alt='Leader Board Icon'
                        fill={true}
                        priority={true}
                        className='object-cover w-full h-full'
                        draggable={false}
                    />
                </div>
                <div className='flex gap-[10px] pt-3 '>
                    <span className='font-nico-moji text-color-6 text-[32px] '>Leader</span>
                    <span className='font-nico-moji text-color-29 text-[32px] '>Board</span>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full h-full items-center justify-center ">
                    <span className="font-nico-moji text-[25px] text-color-6 capitalize text-center">
                        Loading...
                    </span>
                </div>
            )
                : (
                    <div className=' w-full gap-[25px] flex flex-col '>
                        {leaders[0] && (
                            <div className=' w-full flex gap-[35px] items-center justify-center '>
                                <div className='w-[69px] h-[59px] relative sm:block hidden '>
                                    <Image
                                        src="/../../assets/FirstPlace.svg"
                                        alt='First Place Icon'
                                        fill={true}
                                        priority={true}
                                        className='object-cover w-full h-full '
                                        draggable={false}
                                    />
                                    <span className='font-nico-moji text-[32px]  text-[#F6CB61] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>1</span>
                                </div>
                                <Link href={`/profile/${leaders[0].providerId}`}>
                                    <div className='w-[345px]  h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px] hover:scale-[1.01] hover:opacity-95' >
                                        <div className='flex flex-col'>
                                            {isLoading ? (
                                                <Skeleton className="w-[150px] h-[21px] rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <span className='font-nico-moji text-[14px]  text-color-6'>
                                                            {`${leaders[0].firstName.substring(0, 6)}${leaders[0].firstName.length > 6 ? '..' : ''} `}
                                                        </span>
                                                        <span className='font-nico-moji text-[12px]  text-color-29'>
                                                            {` @${leaders[0].nickName.substring(0, 6)}${leaders[0].nickName.length > 6 ? '..' : ''}`}
                                                        </span>
                                                    </div>
                                                )}
                                            {isLoading ? (
                                                <Skeleton className="w-[100px] h-[17px] mt-1 rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <span className='font-nico-moji text-[12px]  text-color-29'>{`LEVEl ${leaders[0].level}`}</span>
                                                )}
                                        </div>
                                        {isLoading ? (
                                            <Skeleton className="w-[48px] h-[48px] rounded-full bg-color-25" />
                                        )
                                            : (
                                                <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden border-[1px] border-color-0'>
                                                    <Image
                                                        src={leaders[0].avatar}
                                                        alt='First Place Icon'
                                                        fill={true}
                                                        sizes='100%'
                                                        priority={true}
                                                        className='object-cover w-full h-full '
                                                        draggable={false}
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </Link>
                            </div>
                        )}
                        {leaders[1] && (
                            <div className=' w-full flex gap-[35px]  items-center justify-center'>
                                <div className='w-[69px] h-[59px] relative sm:block hidden'>
                                    <Image
                                        src="/../../assets/Secondplace.svg"
                                        alt='First Place Icon'
                                        fill={true}
                                        priority={true}
                                        className='object-cover w-full h-full '
                                        draggable={false}
                                    />
                                    <span className='font-nico-moji text-[32px]  text-[#BDBDBD] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>2</span>
                                </div>
                                <Link href={`/profile/${leaders[1].providerId}`}>
                                    <div className='w-[290px] h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px] hover:scale-[1.01] hover:opacity-95' >
                                        <div className='flex flex-col'>
                                            {isLoading ? (
                                                <Skeleton className="w-[150px] h-[21px] rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <span className='font-nico-moji text-[14px]  text-color-6'>
                                                            {`${leaders[1].firstName.substring(0, 6)}${leaders[1].firstName.length > 6 ? '..' : ''} `}
                                                        </span>
                                                        <span className='font-nico-moji text-[12px]  text-color-29'>
                                                            {` @${leaders[1].nickName.substring(0, 6)}${leaders[1].nickName.length > 6 ? '..' : ''}`}
                                                        </span>
                                                    </div>
                                                )}
                                            {isLoading ? (
                                                <Skeleton className="w-[100px] h-[17px] mt-1 rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <span className='font-nico-moji text-[12px]  text-color-29'>{`LEVEl ${leaders[1].level}`}</span>
                                                )}
                                        </div>
                                        {isLoading ? (
                                            <Skeleton className="w-[48px] h-[48px] rounded-full bg-color-25" />
                                        )
                                            : (
                                                <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden border-[1px] border-color-0'>
                                                    <Image
                                                        src={leaders[1].avatar}
                                                        alt='First Place Icon'
                                                        fill={true}
                                                        sizes='100%'
                                                        priority={true}
                                                        className='object-cover w-full h-full '
                                                        draggable={false}
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </Link>
                            </div>
                        )}
                        {leaders[2] && (
                            <div className=' w-full flex gap-[35px] items-center justify-center  '>
                                <div className='w-[69px] h-[59px] relative sm:block hidden'>
                                    <Image
                                        src="/../../assets/thirdPlace.svg"
                                        alt='First Place Icon'
                                        fill={true}
                                        priority={true}
                                        className='object-cover w-full h-full '
                                        draggable={false}
                                    />
                                    <span className='font-nico-moji text-[32px]  text-[#D7936C] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>3</span>
                                </div>
                                <Link href={`/profile/${leaders[2].providerId}`}>
                                    <div className='w-[235px] h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px] hover:scale-[1.01] hover:opacity-95' >
                                        <div className='flex flex-col'>
                                            {isLoading ? (
                                                <Skeleton className="w-[150px] h-[21px] rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <span className='font-nico-moji text-[14px]  text-color-6'>
                                                            {`${leaders[2].firstName.substring(0, 6)}${leaders[2].firstName.length > 6 ? '..' : ''} `}
                                                        </span>
                                                        <span className='font-nico-moji text-[12px]  text-color-29'>
                                                            {` @${leaders[2].nickName.substring(0, 6)}${leaders[2].nickName.length > 6 ? '..' : ''}`}
                                                        </span>
                                                    </div>
                                                )}
                                            {isLoading ? (
                                                <Skeleton className="w-[100px] h-[17px] mt-1 rounded-[22px] bg-color-25" />
                                            )
                                                : (
                                                    <span className='font-nico-moji text-[12px]  text-color-29'>{`LEVEl ${leaders[2].level}`}</span>
                                                )}
                                        </div>
                                        {isLoading ? (
                                            <Skeleton className="w-[48px] h-[48px] rounded-full bg-color-25" />
                                        )
                                            : (
                                                <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden border-[1px] border-color-0'>
                                                    <Image
                                                        src={leaders[2].avatar}
                                                        alt='First Place Icon'
                                                        fill={true}
                                                        sizes='100%'
                                                        priority={true}
                                                        className='object-cover w-full h-full '
                                                        draggable={false}
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </Link>
                            </div>
                        )}

                    </div>
                )}
        </div>
    )

}
