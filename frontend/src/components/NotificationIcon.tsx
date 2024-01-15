import React from 'react';
import Image from 'next/image';

const NotificationIcon = () => {
    return (
        <div className='w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center  cursor-pointer'>
            <div className='relative h-full w-full flex items-center justify-center'>
                <Image
                    src="/../../assets/Notification.svg"
                    alt="My Gallery Image"
                    height={30}
                    width={30}
                />

                <div className='h-[10px] w-[10px] rounded-full absolute bg-color-22 border-1 border-color-0 animate-ping  top-[15px] right-[20px] flex items-center justify-center'>

                </div>
            </div>
        </div>
    );
};

export default NotificationIcon;