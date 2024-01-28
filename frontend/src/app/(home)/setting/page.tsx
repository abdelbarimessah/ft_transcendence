'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import SettingsPrompt from "@/components/settings/SettingsForm";

function setting() {

    const [profile, setProfile] = useState(null);
    const [enterToPage, setEnterToPage] = useState(false);
    useEffect(() => {
            const getProfile = async () => {
                if(enterToPage === false)
                {
                    try {
                        const response = await axios.get('http://localhost:3000/profile', {
                            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBYmRlbGJhcmkiLCJwcml2ZGVySWQiOiIxMTQ3Mjk1MTMyMTg3NTAxNzMzMDkiLCJpYXQiOjE3MDY0MzY5MTUsImV4cCI6MTcwNjY5NjExNX0.TU7RA8Zs_TAWaSciKS9rLu9lIXAaoVSu6W8fqpg37hs' }
                        });
                        setProfile(response.data);
                        console.log('profile', response.data);
                        setEnterToPage(true);

                    } catch (error) {
                        console.error(error);
                    }
                } 
            };
            getProfile();
        });

    return (
        <div className=" bg-color-18 flex items-center justify-center w-full ">
            <SettingsPrompt/>
        </div>
    );
}
export default setting;