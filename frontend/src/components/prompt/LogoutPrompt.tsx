import { useEffect } from 'react';
import styles from './Prompt.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation'

axios.defaults.withCredentials = true;


function LogoutPrompt(props:any) {
    const router = useRouter()
    const handleCancelClick = () => {
        console.log("cancel clicked");
        // props.onCancel();
        props.setShowLogoutPrompt(props.showLogoutPrompt);
    };


    // useEffect(() => {
        async function handleLogoutClick  ()  {
            try {
                console.log("logout clicked1");
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {withCredentials: true});
                console.log('res i the logout ', res);
                
                router.push('/');
                console.log("logout clicked");
            }
            catch (error) {
                console.error(error);
            }
        }

    return(
        <div className={` ${styles.playCard} fixed left-36 bottom-28 w-[388px] h-[132px] z-[1000] bg-color-0 rounded-[22px] flex flex-col gap-[25px] overflow-hidden`}>
            <div className=" w-full flex items-center justify-center pt-[10px]">
                <p className="text-[24px] text-color-6 font-nico-moji">Logout</p>
            </div>
            <div className=" flex w-full items-center justify-center gap-[36px]">
                <div onClick={() => handleCancelClick} className="w-[120px] h-[35px] bg-color-25 rounded-[22px] flex items-center justify-center cursor-pointer">
                    <p className="text-[14px] text-color-0 font-nico-moji" >Cancel</p>
                </div>
                <div onClick={handleLogoutClick} className="w-[120px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer">
                    <p className="text-[14px] text-color-0 font-nico-moji" >Confirm</p>
                </div>
            </div>
        </div>
    )
}


export default LogoutPrompt;