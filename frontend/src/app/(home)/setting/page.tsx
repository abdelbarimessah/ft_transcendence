'use client'
import SettingsPrompt from "@/components/settings/SettingsForm";
import axios from "axios";
import { use } from "matter";
import { useEffect } from "react";


function setting() {

    // useEffect(() => {
    //     const getData = async () => {
    //         const id = '93981';
    //         try {
    //             const res = await axios.get(`http://localhost:3000/user/${id}`);
    //             console.log(res.data);
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, []);
    
    return (
        <div className=" bg-color-18 flex items-center justify-center w-full ">
             <SettingsPrompt/> 
        </div>
    );
}
export default setting;