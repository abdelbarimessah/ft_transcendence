import ModeCard from "@/components/cards/ModeCard";
import ParticleBackground from "@/components/Tsparticles";


function choseMode() {
    return (
        <>
            <div className="w-full max-h-screen h-screen bg-color-18 flex justify-center items-center relative  overflow-auto  scrollbar-hide no-scrollbar ">
                <ParticleBackground />
                <ModeCard />
            </div>
        </>
    )
}

export default choseMode;