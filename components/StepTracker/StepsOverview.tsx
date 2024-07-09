import Image from "next/image";

'use-client'

const StepsOverview = () => {
    return(
        <div className={"flex flex-row items-center justify-center w-full h-full gap-6 drop-shadow-lg border shadow-lg rounded-2xl p-6 "}>
            <div className={"flex flex-col items-center justify-between w-full h-full p-3 gap-6"}>
                <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                    <h1>Total Steps</h1>
                    <h1>3445</h1>
                </div>
                <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                    <h1>Target Steps</h1>
                    <h1>3445</h1>
                </div>
            </div>
            <Image className={"w-full h-full"} src={"/images/backgroundImage.svg"} alt={""} width={100} height={100}/>
        </div>
    )
}
export default StepsOverview