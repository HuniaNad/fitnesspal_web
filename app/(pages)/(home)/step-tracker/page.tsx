'use client'

import {Button} from "antd";
import DailySteps from "@/components/StepTracker/DailySteps";
import DailyTarget from "@/components/StepTracker/DailyTarget";
import WeeklyActivity from "@/components/HomePage/GlanceSection/WeeklyActivity";
import MealGraph from "@/components/MealPlanner/MealGraph";
import { useEffect, useState } from "react";

const StepTracker = () => {
    const [stepCount, setStepCount] = useState(0);
    const [stepGoal, setStepGoal] = useState(10000);
    const [stepPercentage, setStepPercentage] = useState(0);

    useEffect(() => {
        async function getStepHistory() {
            try {
                const userData = localStorage.getItem('userData');
                const userId = userData ? JSON.parse(userData).id : null;
        
                const response = await fetch(`http://localhost:8080/step-tracker/get-today-steps/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const { stepGoal, stepHistory } = data;
        
                const stepData = {
                    stepGoal,
                    currentSteps: stepHistory.currentSteps
                };
        
                localStorage.setItem('stepData', JSON.stringify(stepData));
                setStepCount(stepHistory.currentSteps);
                setStepGoal(stepGoal);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        getStepHistory();
    }, [])

    useEffect(() => {
        const percentageSteps = (stepCount > 0) ? (parseFloat(((stepCount / stepGoal) * 100).toFixed(1))) : stepCount;
        setStepPercentage(percentageSteps);
    }, [stepCount, stepGoal])
    
    return (
        <div className=" flex flex-col justify-center items-center w-full h-full gap-10">
            <div className={"w-full flex flex-row justify-between items-center"}>
                <div className={"flex flex-col gap-2 w-full"}>
                    <h1 className={"w-full text-start font-semibold text-2xl"}>
                        Good Day!
                    </h1>
                    <p className={"text-md text-black/40"}>
                        Are we ready to get going?
                    </p>
                </div>
                <Button rootClassName={"bg-black text-white w-32 h-10"} size={"large"}>View Insights</Button>
            </div>
            <div className={"flex flex-row justify-center gap-5 items-start h-full w-full"}>
                <div className={"flex flex-col gap-6 justify-center items-center h-full w-full"}>
                    <DailyTarget stepGoal={stepGoal}/>
                    <DailySteps stepPercentage={stepPercentage} stepCount={stepCount} stepGoal={stepGoal} />
                </div>

                <div className={"flex flex-col gap-6 justify-center items-center w-full"}>
                    <MealGraph showInfo={true}/>
                </div>
            </div>
        </div>
    )
}

export default StepTracker

