import OtpVerifyCard from "@/components/otp/OtpVerifyCard";
import ParticleBackground from "@/components/particles/Tsparticles";



function auth() {

    return(
        <div className="bg-color-18 w-screen h-screen ">
            <ParticleBackground />
            <div className="w-full h-full flex items-center justify-center">
                <OtpVerifyCard />
            </div>
        </div>
    )
}

export default auth;