import React from 'react';
import Image from 'next/image';

const SearchBareHeader = () => {
    return (
        <div className='w-[651px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-start gap-[10px] cursor-pointer'>
            <div className='pl-[36px]'>
                <Image
                    src="/../../assets/SearchIcon.svg"
                    alt="My Gallery Image"
                    width={30}
                    height={30}
                />
            </div>
            <div className='w-full mr-10 h-[70%] rounded-[22px] border-color-6'>
                <input type="text" placeholder='Search...' className='placeholder-color-20/50 px-[8px] h-full tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-black/80 text-[22px] w-full mr-2 focus:outline-none'/>
            </div>

        </div>
    );
};

export default SearchBareHeader;