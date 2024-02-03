import Header from "@/components/header/header";
import OtpPrompt from "@/components/prompt/OtpPrompt";

function home() {
    return (
        <>
            <div className="w-full max-h-screen h-screen bg-color-18 gap-96 relative ">
                <Header />
                <div className="absolute top-52 left-52">
                    <OtpPrompt/>
                </div>
            </div>
        </>
    )
}

export default home;