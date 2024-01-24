import React from 'react';
import Image from 'next/image';

const SearchBareHeader = () => {
    return (
        <div className='max-w-[651px] w-full h-[66px] bg-color-0 rounded-[22px] flex items-center justify-start gap-[10px] cursor-pointer'>
                <div className='h-full w-[60px] flex items-center justify-center'>
            <div className=' w-[30px] h-[30px] relative '>
                <Image
                    src="/../../assets/SearchIcon.svg"
                    alt="My Gallery Image"
                    fill={true}
                />
            </div>

            </div>
            <div className='w-full h-[70%] rounded-[22px] border-color-6'>
                <input type="text" placeholder='Search...' className='placeholder-color-20/50 px-[8px] h-full tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-black/80 text-[22px] w-full mr-2 focus:outline-none'/>
            </div>

        </div>
    );
};

export default SearchBareHeader;