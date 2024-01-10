import ModeCard from "@/components/ModeCard";
import ParticleBackground from "@/components/Tsparticles";


function Home() {
    return (
        <>
            <div className="w-full max-h-screen h-screen bg-color-18 flex justify-center items-center relative  overflow-auto  scrollbar-hide">
                <ParticleBackground />
                <ModeCard />
            </div>
        </>
    )
}

export default Home;