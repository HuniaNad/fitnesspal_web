'use client'


import {FaPersonRunning} from "react-icons/fa6";
import StepsOverview from "@/components/StepTracker/StepsOverview";
import {Calendar, CalendarProps, DatePicker, Divider, Tabs, TabsProps} from "antd";
import {useState} from "react";
import SplineGraph from "@/components/StepTracker/SplineGraph";
import {FaRunning} from "react-icons/fa";
import MealGraph from "@/components/MealPlanner/MealGraph";
import CaloriesGraph from "@/components/StepTracker/CaloriesGraph";
import {Dayjs} from "dayjs";

const MyActivity = () => {
    const {RangePicker} = DatePicker;
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const [activeKey, setActiveKey] = useState('Day');
    return (
        <div className={"flex flex-col items-center justify-center gap-10 w-full h-full"}>
            <div className={"flex flex-row items-center justify-between w-full h-full"}>
                <h1 className={"font-bold text-2xl"}>My Activity</h1>
                <div className={"flex flex-row items-center justify-center gap-4"}>
                    <div className={"w-fit h-fit  p-1 rounded-full border-secondary border-4"}>
                        <div
                            className={"rounded-full flex flex-col  items-center justify-center border-4 border-dashed border-secondary w-full h-full p-6"}>

                            <FaPersonRunning className={"text-secondary "} size={20}/>

                        </div>

                    </div>
                    <div>
                        <h1 className={"text-lg font-bold "}>3445/4000</h1>
                        <p className={"text-sm text-black/50"}>Steps</p>
                    </div>
                </div>

            </div>
            <div
                className={"w-full h-full p-3 rounded-2xl cursor-pointer flex items-center flex-row justify-around border shadow-lg "}>
                <div
                    className={`text-lg font-bold px-3 py-2 rounded-2xl duration-300 transition-all ease-in-out  ${activeKey === "Day" ? "bg-secondary text-white" : "text-black"}`}
                    onClick={() => {
                        setActiveKey("Day")
                    }}>
                    Day
                </div>
                <div
                    className={`text-lg font-bold px-3 py-2 rounded-2xl  duration-300 transition-all ease-in-out ${activeKey === "Week" ? "bg-secondary text-white" : "text-black"}`}
                    onClick={() => {
                        setActiveKey("Week")
                    }}>Week
                </div>
                <div
                    className={`text-lg font-bold px-3 py-2 rounded-2xl duration-300 transition-all ease-in-out  ${activeKey === "Month" ? "bg-secondary text-white" : "text-black"}`}
                    onClick={() => {
                        setActiveKey("Month")
                    }}>Month
                </div>

            </div>
            {activeKey === "Day" &&
                <div className={"w-full h-full flex flex-col items-center justify-center gap-5"}>

                    <StepsOverview/>
                </div>
            }
            {activeKey === "Week" &&
                <div className={"w-full h-full flex flex-row items-start justify-between gap-5"}>
                    <div className={"flex flex-col gap-6 items-center justify-center w-full"}>
                        <div className={"w-full flex flex-col gap-2 "}>
                            <h1 className={"font-semibold"}>Select Week</h1>
                            <RangePicker size={"large"}/>
                        </div>
                        <MealGraph />
                    </div>
                    <div className={"flex flex-col items-center gap-4 justify-center w-full"}>

                        <CaloriesGraph />
                        <CaloriesGraph />

                    </div>
                </div>
            }
            {activeKey === "Month" &&
                <div className={"shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-5 w-full p-5"}>
                    <Calendar  onPanelChange={onPanelChange}/>
                    <Divider className={"bg-secondary"}/>
                    <div className={"flex flex-col items-center justify-between w-full h-full p-3 gap-6"}>
                        <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                            <h1>Totla Steps</h1>
                            <h1>3445</h1>
                        </div>
                        <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                            <h1>Target Steps</h1>
                            <h1>3445</h1>
                        </div>
                    </div>
                    <div></div>
                </div>
            }
        </div>
    )
}
export default MyActivity