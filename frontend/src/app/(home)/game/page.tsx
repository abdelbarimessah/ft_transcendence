import ModeCard from "@/components/cards/ModeCard";
import Header from "@/components/header/header";
import ParticleBackground from "@/components/particles/Tsparticles";


function choseMode() {
    return (
        <>
            <div className="w-full  h-full bg-color-18 flex flex-col  items-center  overflow-scroll no-scrollbar ">
                <ParticleBackground />
                <Header/>
                <div className="w-full h-full flex justify-center items-center">
                    <ModeCard />
                </div>
            </div>
        </>
    )
}

export default choseMode;