import SettingsPrompt from "@/components/settings/SettingsForm";

function setting() {
    return (
        <>
            <div className="w-full gap-10 max-h-screen h-screen bg-color-18 flex items-center justify-center ">
                <SettingsPrompt/>
            </div>
        </>
    )
}

export default setting;