import Image from "next/image";
import React from "react";

const WorkOutSection = () => {
    const [workout, setWorkout] = React.useState(); 

    React.useEffect (() => {
        const workoutData = localStorage.getItem("workoutData");
        if(workoutData) {
            setWorkout(JSON.parse(workoutData));
        }
    }, [])

    return (
        <div
            className={"flex flex-col items-center justify-center rounded-2xl  border shadow-lg p-8 gap-4 w-full h-fit"}>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <div className={"flex flex-col w-full items-start justify-center gap-3"}>
                    <h1>{workout ? "Today’s Workout" : "Get Your Personalized Workout Plan!"}</h1>
                    <div className={"flex flex-col w-full items-start justify-center "}>
                        <h1 className={"font-medium text-black/40 text-md"}>{workout ? workout?.title : ""}</h1>
                    </div>
                </div>
                <Image src={"/images/workout.svg"} alt={""} width={100} height={100}/>

            </div>



        </div>
    )
}
export default WorkOutSection