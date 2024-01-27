'use client'
import SettingsPrompt from "@/components/settings/SettingsForm";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000/";


function setting() {
    useEffect(() => {
        
        async function handleToken() {
            
            console.log('hello');
            try{
                const res =  await axios.get('profile', {headers : {Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDYzNDk3MTEsImV4cCI6MTcwNjYwODkxMX0.Wu-lcfwU1B4Myazs0xGCdBUwXdHhfUM54EGhcr4EOwY`}});
                console.log(res);
            }
            catch(err){
                console.log(err);
            }
        }
        handleToken();
        }, [])
    return (
        <>
            <div className=" bg-color-18 flex items-center justify-center w-full ">
                <SettingsPrompt/>
            </div>
        </>
    )
}

export default setting;