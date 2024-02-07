'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Skeleton } from '@nextui-org/react';

const ProfileHeader = () => {
    const [photoPath, setPhotoPath] = useState<any>();
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [nickName, setNickName] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
                setId(res.data.providerId);
                setNickName(res.data.nickName);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        setPhotoPath(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${id}.png`)
        getData();
    }, [id]);

    return (
        <div className='w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center gap-[8px] cursor-pointer xl:w-[280px]'>
            <div className=' relative'>
            {isLoading ? (
                        <Skeleton className="w-[50px] h-[50px] rounded-full bg-color-25" />
                    )
                        : (
                    <div className='w-[50px] h-[50px] bg-color-15 rounded-full relative overflow-hiddenr'>
                        <img src={photoPath} alt=""  className='object-cover  rounded-full  w-[50px] h-[50px]'/>
                        {/* <Image
                            src="/../../assets/ProfileHeaderImage.svg"
                            alt="My Gallery Image"
                            fill={true}
                            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                            className='object-cover  rounded-full  w-[50px] h-[50px]'
                        /> */}
                    </div>
                )}
                <div className='w-[10px] h-[10px] rounded-full bg-color-21 absolute bottom-1 right-[2px] z-50'></div>
            </div>
            <div className=' xl:block w-[184px] h-[30px]  rounded-[10px]'>
            {isLoading ? (
                        <Skeleton className="w-[184px] h-[30px] rounded-[10px] bg-color-25" />
                    )
                : (
                <span className='capitalize text-color-20 font-poppins font-[500] text-[20px] pl-3'>{nickName}</span>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;