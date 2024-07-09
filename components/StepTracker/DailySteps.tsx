
import {FaPersonRunning} from "react-icons/fa6";

const DailySteps = ({stepPercentage, stepCount, stepGoal}: 
    {stepPercentage: number, stepCount: number, stepGoal: number}
) => {

    return (
        <div
            className={"flex flex-col items-center border shadow-lg rounded-2xl p-5 gap-6 justify-center w-full h-full"}>
            <h1 className={"uppercase font-bold text-md text-secondary"}>Daily Steps</h1>
            <p className={"text-black text-center text-lg w-full"}>
                You have walked <span className={"text-secondary font-bold "}>{stepPercentage}%</span> of your Goal
            </p>

            <div className={"w-52 h-52  p-3 rounded-full border-secondary border-8"}>
                <div
                    className={"rounded-full flex flex-col  items-center justify-center border-4 border-dashed border-secondary w-full h-full"}>

                    <FaPersonRunning className={"text-secondary text-3xl"} size={50}/>
                    <h1 className={"text-lg font-bold "}>{stepCount}/{stepGoal}</h1>
                    <p className={"text-sm text-black/50"}>Steps</p>
                </div>

            </div>

        </div>
    )
}

export default DailySteps;
