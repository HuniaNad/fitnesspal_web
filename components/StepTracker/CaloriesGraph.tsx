import {AiOutlineFire} from "react-icons/ai";
import SplineGraph from "@/components/StepTracker/SplineGraph";

const CaloriesGraph = () => {
    return(
        <div className={"flex px-5 flex-col  items-center justify-center gap-6 w-full h-full"}>
            <div className={"flex w-full items-center font-bold flex-row gap-4"}>
                <div className={"bg-secondary p-2 rounded-full"}>
                <AiOutlineFire className={"text-white"}/>
                </div>
                <h1>Calories Burned</h1>
            </div>
            <div className={"shadow-lg rounded-2xl"}>
            <SplineGraph/>
            </div>
        </div>
    )
}
export default CaloriesGraph
