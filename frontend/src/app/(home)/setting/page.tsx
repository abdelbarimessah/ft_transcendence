'use client'
import OtpCard from "@/components/otp/OtpCard";
import SettingsPrompt from "@/components/settings/SettingsForm";
import axios from "axios";
import { use } from "matter";
import { useEffect } from "react";


function Setting() {

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/changeFirstTime`);
    }, []);
    return (
        <div className=" bg-color-18 flex items-center no-scrollbar justify-center w-full  py-10">
            <div className="gap-5 flex w-full h-full mx-10 no-scrollbar flex-col 2xl:flex-row items-center justify-center">
                <SettingsPrompt />
                <OtpCard />
            </div>
        </div>
    );
}
export default Setting;