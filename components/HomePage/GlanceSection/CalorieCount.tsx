import { MdSportsGymnastics } from "react-icons/md";
import { Progress } from "antd";
import { RiFireFill, RiFireLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getCalorieGoal, getCalorieRange } from "@/utils/Validations/healthprofileHandler";

const CalorieCount = () => {
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : {};
    const defaultCalorieGoal = user.gender === 'Female'? 2000 : 2500;
    const [calories, setCalories] = useState<{ caloriesConsumed: number; caloriesGoal: number | null }>({caloriesConsumed: 0, caloriesGoal: defaultCalorieGoal});

    useEffect(() => {
        async function getCalorieConsumedHistory() {
            try {
                const userId = user ? user.id : null;
        
                const response = await fetch(`http://localhost:8080/nutritional-profile/get-daily-calories-consumed/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const {caloriesConsumed} = data.data;
        
                const calorieData = {
                    caloriesConsumed: parseFloat((caloriesConsumed).toFixed(2)),
                    caloriesGoal: getCalorieGoal()
                };

                localStorage.setItem('calorieData', JSON.stringify(calorieData));
                setCalories(calorieData);   
            } catch (error) {
                console.error('Error:', error);
            }
        }

        getCalorieConsumedHistory();
    }, [])

    const percentageCalories = calories && calories.caloriesGoal ? ((calories?.caloriesConsumed / calories?.caloriesGoal) * 100) : 0;

    

    return (
        <div
            className={"flex flex-col items-center justify-center rounded-2xl border shadow-lg p-4 gap-4 w-full h-full"}>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <h3>Calorie Count</h3>
                <RiFireFill size={23} className={"backgroundColor  text-white p-1 rounded-full"} />
            </div>

            <div className={"flex flex-row items-center justify-between w-4/5"}>
                <div className={"flex flex-row w-full items-center justify-center gap-6"}>
                    <Progress strokeColor={"#263238"} strokeWidth={10} type="circle" percent={percentageCalories} />
                    <div className={"flex flex-row gap-1 items-center "}>

                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-center gap-1">
                                <RiFireLine />
                                <h1>Calories Consumed</h1>
                            </div>
                            <h1 className={"text-center font-bold"}>{calories?.caloriesConsumed ?? 0}/{calories?.caloriesGoal ?? 0}</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CalorieCount