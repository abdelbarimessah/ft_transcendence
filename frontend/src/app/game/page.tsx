import ModeCard from "@/components/ModeCard";
import ParticleBackground from "@/components/Tsparticles";


function Home() {
    return (
        <>
            <div className="bg-color-6 min-h-screen w-screen bg-cover bg-fixed flex justify-center items-center"> 
                <ParticleBackground />
                <ModeCard />
            </div>
        </>
    )
}

export default Home;