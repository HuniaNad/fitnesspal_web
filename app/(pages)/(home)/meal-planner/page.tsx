'use client'
import React, {useState} from 'react'
import Image from "next/image";
import StepZero from "@/components/MealPlanner/StepZero";
import {Button, Steps, theme} from "antd";
import StepOne from "@/components/MealPlanner/StepOne";
import StepTwo from "@/components/MealPlanner/StepTwo";
import {useRouter} from "next/navigation";

const MealPlannerScreen = () => {
    const steps = [
        {
            title: '',
            content: <StepZero/>,
        },
        {
            title: '',
            content: <StepOne/>,
        },
        {
            title: '',
            content: <StepTwo/>,
        },
    ];
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
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
            <div>{steps[current].content}</div>
            {current === 0 && (
                <div className={"flex flex-col items-center justify-center gap-6 w-full h-full"}>
                    <Button size={"large"} rootClassName={"backgroundColor w-52  text-white"} onClick={() => next()}>
                        Get Meal Plan
                    </Button>
                    <p className={"text-black/40 text-xs"}>Discover Personalized Meal Plans, Tailored to Your Unique
                        Tastes and Nutritional Needs</p>
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
            )}{current === 2 && (
            <div className={"flex flex-row items-center justify-center gap-6 w-full h-full"}>
                <Button size={"large"} rootClassName={"backgroundColor w-52  text-white"}
                        onClick={() => router.push("/meal-planner/meal-planner-landing")}>
                    Next
                </Button>
                <Button size={"large"} rootClassName={"bg-white w-52  text-primary"} onClick={() => prev()}>
                    Previous
                </Button>
            </div>
        )}

        </div>
    )
}

export default MealPlannerScreen