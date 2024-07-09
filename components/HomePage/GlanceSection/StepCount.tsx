import {IoFootsteps} from "react-icons/io5";
import {Progress} from 'antd';
import { useState, useEffect } from "react";

const StepCount = () => {
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
        <div
            className={"flex flex-col items-center justify-center rounded-2xl border shadow-lg p-4 gap-4 w-full h-full"}>
            <div className={"flex flex-row items-center justify-between w-4/5"}>
                <h3>Step Count</h3>
                <IoFootsteps size={23} className={"backgroundColor  text-white p-1 rounded-full"}/>
            </div>
            <Progress strokeColor={"#263238"} strokeWidth={10} type="circle" percent={stepPercentage}/>
            <h1 className={"text-center font-bold w-full"}>Today&apos;s Target: {stepCount}/{stepGoal}</h1>
        </div>
    )
}
export default StepCount