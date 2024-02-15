'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import debounce from 'debounce';

const SearchBareHeader = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);


     const debouncedHandleInputChange = debounce(async (value) => {
        setSearchInput(value);
        try {
            const response = await axios.get("http://localhost:3000/user/userSearch", {
                params: { query: value }
            });
    
            console.log('response**************************', response.data.filtered);
            setSearchResults(response.data.filtered);
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    }, 500);
    const handleInputChange = (event:any) => {
        debouncedHandleInputChange(event.target.value);
    };
    const handleSearch = async (event:any) => {
        event.preventDefault();

        // Replace with your actual API endpoint

    };
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
            <form onSubmit={handleSearch} className='w-full h-[70%] rounded-[22px] border-color-6'>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='placeholder-color-20/50 px-[8px] h-full tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-black/80 text-[22px] w-full mr-2 focus:outline-none'
                    value={searchInput}
                    onChange={handleInputChange}
                />
            </form>
            <div>
                {searchResults.map((result, index) => (
                    <div key={index}>
                        {/* Replace this with how you want to display each result */}
                        <p>{result?.nickName}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SearchBareHeader;