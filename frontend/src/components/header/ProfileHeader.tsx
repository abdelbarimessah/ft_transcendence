import React from 'react';
import Image from 'next/image';

const ProfileHeader = () => {
    return (
        <div className='w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center gap-[8px] cursor-pointer xl:w-[280px]'>
            <div className=' relative'>
                <div className='w-[50px] h-[50px] bg-color-15 rounded-full relative '>

                    <Image
                        src="/../../assets/ProfileHeaderImage.svg"
                        alt="My Gallery Image"
                        fill={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        className='object-cover  rounded-full  w-[50px] h-[50px]'
                    />
                </div>
                <div className='w-[10px] h-[10px] rounded-full bg-color-21 absolute bottom-1 right-[2px] z-50'></div>
            </div>
            <div className='hidden xl:block'>
                <span className='capitalize text-color-20 font-poppins font-[500] text-[20px]'>abdelbari messah</span>
            </div>
        </div>
    );
};

export default ProfileHeader;