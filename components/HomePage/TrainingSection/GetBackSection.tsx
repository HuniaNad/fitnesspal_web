import {FaAngleRight} from "react-icons/fa6";
import WorkOutSection from "@/components/HomePage/TrainingSection/WorkOutSection";
import Image from "next/image";
import Link from "next/link";
import MealGraph from "@/components/MealPlanner/MealGraph";

const GetBackSection = () => {
    return(
        <div className={"flex flex-col w-full h-full gap-6"}>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <h1 className={"w-full text-start font-semibold text-xl"}>Your Workout Plan</h1>
                <Link href={"/workout-planner"}>
                    <FaAngleRight className={"text-black"}/>
                </Link>
            </div>
            <Link href={"/workout-planner"}>
                <WorkOutSection/>
            </Link>


            {/* <div className={"flex flex-row items-center justify-between w-full"}>
                <h1 className={"w-full text-start font-semibold text-xl"}>Popular Recipes</h1>
                <FaAngleRight className={"text-black"}/>
            </div> */}
            <div className={"rounded-3xl flex flex-col  gap-1.5"}>
                <MealGraph showInfo={true}/>
            </div>

        </div>
    )
}
export default GetBackSection