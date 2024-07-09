import { Button } from "antd";
import StepCount from "@/components/HomePage/GlanceSection/StepCount";
import ActivitySection from "@/components/HomePage/GlanceSection/ActivitySection";
import CalorieCount from "@/components/HomePage/GlanceSection/CalorieCount";
import WeeklyActivity from "@/components/HomePage/GlanceSection/WeeklyActivity";
import { useEffect, useState } from "react";
import { handleBMIStatus } from "@/utils/bmiCalculator";

const BmiRangeSection = ({ bmi }: { bmi: string }) => {
    const [waterIntakeValue, setWaterIntakeValue] = useState(6);

    useEffect(() => {
        async function getWaterIntakeHistory() {
            try {
                const userData = localStorage.getItem('userData');
                const userId = userData ? JSON.parse(userData).id : null;
        
                const response = await fetch(`http://localhost:8080/nutritional-profile/get-daily-water-intake/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const {waterIntake} = data.data;
        
                const waterIntakeData = {
                    waterIntake: waterIntake
                };
                localStorage.setItem('waterIntakeData', JSON.stringify(waterIntakeData));
                setWaterIntakeValue(waterIntake);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        getWaterIntakeHistory();
    }, [])

    

    return (
        <div className={"flex flex-col gap-4 w-full h-full"}>
            <div className={"flex flex-row items-center justify-between  w-full"}>
                <h3>{handleBMIStatus(bmi)}</h3>
                {/* <Button size={"large"} className={"bg-black text-sm  text-white w-fit"}>See Full Progress</Button> */}
            </div>
            <div className={"flex flex-row items-center justify-between w-full gap-6"}>
                <StepCount />
                <ActivitySection title="Water Intake" value={waterIntakeValue} />
            </div>
            <CalorieCount />

            {/* <WeeklyActivity/> */}

        </div>
    )
}
export default BmiRangeSection