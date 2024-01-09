import ModeCard from "@/components/ModeCard";
import SideBare from "@/components/SideBare";
import ParticleBackground from "@/components/Tsparticles";


function Home() {
    return (
        <>
            <div className="bg-color-18 min-h-screen w-screen bg-cover bg-fixed flex flex-wrap justify-center overflow-x-hidden"> 
                <ParticleBackground />
                <ModeCard />
                {/* <SideBare/> */}   
            </div>
        </>
    )
}

export default Home;