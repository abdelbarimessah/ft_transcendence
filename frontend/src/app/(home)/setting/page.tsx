'use client'
import AuthWrapper from "@/app/authToken";
import withAuth from "@/app/authToken";
import Header from "@/components/header/header";
import OtpCard from "@/components/otp/OtpCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import SettingsPrompt from "@/components/settings/SettingsForm";

function Setting() {

    return (
        <AuthWrapper>

            <div className=" bg-color-18 flex items-center no-scrollbar justify-center w-full gap-20  py-10 flex-col">
                <div className='w-full h-full absolute '>
                    <ParticleBackground />
                </div>
                <div className="w-full z-[2000] pt-12 2xl:pt-0">
                    <Header />
                </div>
                <div className="gap-5 flex w-full h-full mx-10 no-scrollbar flex-col 2xl:flex-row items-center justify-center">
                    <SettingsPrompt />
                    <OtpCard />
                </div>
            </div>
        </AuthWrapper>
    );
}
export default Setting;