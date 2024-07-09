'use client'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import StepZero from "@/components/WorkoutPlanner/StepZero";
import {Button, Steps, theme} from "antd";
import StepOne from "@/components/WorkoutPlanner/StepOne";
import StepTwo from "@/components/WorkoutPlanner/StepTwo";
import {useRouter} from "next/navigation";
import {Exercise} from "@/components/WorkoutPlanner/workoutPlan";
export interface Item {
    title: string;
    description: string;
    exercises: Exercise[];  // Added to hold the workout exercises
}
const WorkOutPlannerScreen = () => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
const [data, setData] =useState<Item | null>(null);
    const handleItemSelected = (item: Item) => {
        setSelectedItem(item);

        if(typeof window !== 'undefined') {
            const data = localStorage.setItem("workoutData", JSON.stringify(item));
        }
        // Do something with the selected item here (e.g., log it)
        console.log("Selected Item in Parent:", item);
    };
    useEffect(()=>{
        if(typeof window !== 'undefined') {
            const data = localStorage.getItem("workoutData");
            if(data) {
                setData(JSON.parse(data));
            }
        }
    },[])
    const steps = [
        {
            title: '',
            content: <StepZero />,
        },
        {
            title: '',
            content: <StepOne onItemSelected={handleItemSelected} />,
        },
        {
            title: '',
            content: selectedItem ? <StepTwo selectedItem={selectedItem} /> : <StepTwo selectedItem={data} />,
        },
    ];

    const {token} = theme.useToken();
    const [current, setCurrent] = useState(typeof window !== 'undefined' && localStorage.getItem("workoutData") ? 2 : 0);
    const router = useRouter();
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));
    return (
        <div className=" flex flex-col justify-center items-center w-full h-full gap-10">
            <Image src={"/images/logo_black.svg"} className={"w-44 h-44"} alt={""} width={100} height={100}/>
            <Steps rootClassName={"w-1/2"} size="small" current={current} items={items}/>
            <div className={"w-full"}>{steps[current].content}</div>
            {current === 0 && (
                <div className={"flex flex-col items-center justify-center gap-6 w-full h-full"}>
                    <Button size={"large"} rootClassName={"backgroundColor w-52  text-white"} onClick={() => next()}>
                        Get Workout Plan
                    </Button>

                </div>
            )}
            {current === 1 && (
                <div className={"flex flex-row items-center justify-center gap-6 w-full h-full"}>
                    <Button size={"large"} rootClassName={"backgroundColor w-52  text-white"} onClick={() => next()}>
                        Next
                    </Button>
                    <Button size={"large"} rootClassName={"bg-white w-52  text-primary"} onClick={() => prev()}>
                        Previous
                    </Button>
                </div>
            )}{current === 2 && !data && (
            <div className={"flex flex-row items-center justify-center gap-6 w-full h-full"}>
                {/*<Button size={"large"} rootClassName={"backgroundColor w-52  text-white"}*/}
                {/*        onClick={() => router.push("/meal-planner/meal-planner-landing")}>*/}
                {/*    Next*/}
                {/*</Button>*/}
                <Button size={"large"} rootClassName={"bg-white w-52  text-primary"} onClick={() => prev()}>
                    Previous
                </Button>
            </div>
        )}

        </div>
    )
}

export default WorkOutPlannerScreen;