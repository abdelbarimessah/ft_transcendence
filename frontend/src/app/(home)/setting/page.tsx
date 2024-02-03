'use client'
import OtpCard from "@/components/otp/OtpCard";
import SettingsPrompt from "@/components/settings/SettingsForm";


function setting() {

    return (
        <div className=" bg-color-18 flex items-center no-scrollbar justify-center w-full  py-10">
            <div className="gap-5 flex w-full h-full mx-10 no-scrollbar flex-col 2xl:flex-row items-center justify-center">
                <SettingsPrompt />
                <OtpCard />
            </div>
        </div>
    );
}
export default setting;