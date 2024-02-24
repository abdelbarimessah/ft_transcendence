'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';

axios.defaults.withCredentials = true;
const ProfileHeader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`http://localhost:3000/user/me`);
                console.log('res data is ', res.data);
                
                setUser(res.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        getData();
    }, []);

    console.log('thse user in profile [header]', user);
    
    return (
        <Link href='/profile'>
            <div className='w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center xl:pl-5 pl-0 justify-center  xl:justify-start gap-[8px] cursor-pointer xl:w-[280px]'>
                <div className=' relative'>
                    {isLoading ? (
                        <Skeleton className="w-[50px] h-[50px] rounded-full bg-color-25" />
                    )
                        : (
                            <div className='w-[50px] h-[50px] bg-color-15 rounded-full relative overflow-hiddenr'>
                                <Image
                                    src={user.avatar}
                                    alt="My Gallery Image"
                                    fill={true}
                                    sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                                    className='object-cover  rounded-full  w-[50px] h-[50px]'
                                />
                            </div>
                        )}
                    <div className='w-[10px] h-[10px] rounded-full bg-color-21 absolute bottom-1 right-[2px] z-50'></div>
                </div>
                <div className='xl:flex flex-col  hidden'>
                    {isLoading ? (
                        <Skeleton className="w-[165px] h-[20px] rounded-full bg-color-25" />
                    )
                        : (
                            <span className='font-nico-moji text-color-6 text-[16px] capitalize'>{`${user.firstName} ${user.lastName}`}</span>
                        )}
                    {isLoading ? (
                        <Skeleton className="w-[86px] h-[16px] rounded-full mt-1 bg-color-25" />
                    )
                        : (
                            <span className='font-nico-moji -mt-1 text-[12px] text-color-29 capitalize'>{user.nickName}</span>
                        )}
                </div>
            </div>
        </Link>
    );
};

export default ProfileHeader;