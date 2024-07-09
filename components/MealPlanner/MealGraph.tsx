import Link from "next/link";
import GraphSection from "@/components/HomePage/GlanceSection/GraphSection";
import SplineGraph from "@/components/StepTracker/SplineGraph";
import {FaRunning} from "react-icons/fa";
import { useState } from "react";

export interface StepData {
    maxSteps: number;
    maxStepsDay: string;
    maxStepsDate: {
        month: string;
        day: number;
    };
}

const MealGraph = ({children,showInfo}: { children?: React.ReactNode, showInfo?: boolean }) => {
    const [steps, setSteps] = useState<StepData>();

    const handleSteps = (data: StepData) => {
        setSteps(data);
    }

    return (
        <div className={"flex flex-col items-center  justify-center gap-4 w-full h-full"}>
           
            <div
                className={"flex flex-row bg-[#EEE8FE] rounded-2xl shadow-lg p-4   items-center justify-center  gap-4 w-full h-fit"}>
                <div className={"w-full flex flex-col gap-3 justify-center items-center"}>
                    <div className={"w-full text-secondary "}>
                    <FaRunning size={30} />
                    </div>
                    {
                        children? children : <SplineGraph setMaxSteps={handleSteps}/>
                    }
                    <div className={"flex flex-row items-center justify-between w-4/5 bg-white rounded-2xl p-4  "}>
                        <div className={"flex flex-row gap-4"}>
                            <div className={" text-white font-bold  text-lg flex flex-col items-center justify-center gap-3 rounded-lg p-4  bg-secondary"}>
                                <h1 className={"font-semibold"}>{steps?.maxStepsDate.month ?? '-'}</h1>
                                <p>{steps?.maxStepsDate.day ?? '-'}</p>

                            </div>
                            <div className={"flex flex-col gap-3 justify-center font-bold "}>
                                <h3 className={"font-semibold"}>Most Steps</h3>
                                <h1>{steps?.maxStepsDay ?? '-'}</h1>
                            </div>
                        </div>
                        <div className={"text-secondary font-semibold "}>
                            <h1>{steps?.maxSteps ?? '-'}</h1>
                        </div>
                    </div>
                </div>




            </div>

        </div>
    )
}
export default MealGraph
