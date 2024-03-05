import React from 'react';
import LeftSide from '../leftSide';



function Btns({icon, onClick}){

    return (
        <>
            <button type='submit' className=' rounded-full w-[57px] h-[41px] p-[2px]' onClick={onClick}>
                <img src={icon} alt="icon" />
            </button>
        </>
    );
}

export default Btns;