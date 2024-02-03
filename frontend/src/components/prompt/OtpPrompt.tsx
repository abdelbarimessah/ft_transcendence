import styles from './Prompt.module.css'
import axios from 'axios';

axios.defaults.withCredentials = true;



function OtpPrompt() {
    return(
        <div className={` ${styles.playCard} w-[298px] h-[102px] z-[1000] bg-color-26 rounded-[22px] flex flex-col  gap-[16px] overflow-hidden `}>
            <div className=" w-full flex items-center justify-center pt-[10px]  ">
                <p className="text-[20px] text-color-6 font-nico-moji text-center">2FA authentication</p>
            </div>
            <div className=" flex w-full items-center justify-center gap-[20px]">
                <div  className="w-[120px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer">
                    <p className="text-[14px] text-color-0 font-nico-moji" >Enable</p>
                </div>
            </div>
        </div>
    )
}

export default OtpPrompt;