'use client' 

import React from "react";
import OverviewSection from "@/components/HomePage/GlanceSection/OverviewSection";
import {FaChevronDown} from "react-icons/fa";
import {Calendar, Divider} from "antd";
import MealGraph from "@/components/MealPlanner/MealGraph";
import {FaWineGlass} from "react-icons/fa6";
import CalorieCountGraph from "@/components/ProgressInsights/CalorieCountGraph";

const ProgressInsights = () => {
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : {};

    const items = [
        {
            value: "50 kg",
            description: "Current Weight"
        }, {
            value: "22.22 kg/m2",
            description: "Current BMI"
        }, {
            value: "150 cm",
            description: "Current Height"
        }
    ]
    return (
        <div className={"flex flex-col items-center justify-center gap-8 w-full h-full "}>
            {/*<OverviewSection items={items}/>*/}
            <div
                className={"flex flex-col items-center justify-center shadow-lg rounded-2xl text-white p-6 bg-[#263238] gap-6 w-full h-fit"}>
                <div className={"flex flex-col items-start justify-center w-full h-full gap-3"}>
                    <h1 className={"text-2xl w-full font-bold"}>Hey {user.name}!</h1>
                    <h1 className={"text-xl font-semibold w-full"}>Have a look at your progress</h1>
                </div>
                <div className={"flex flex-row items-center justify-between w-full "}>
                    <OverviewSection items={items}/>
                    <div className={"w-full flex flex-col gap-6 items-center justify-center"}>
                        <h1>Your BMI is within the normal Range</h1>
                        <div className={"flex flex-row items-center justify-between w-4/5"}>
                            <h1>Current BMI</h1>
                            <h1>22.22 kg/m2</h1>
                        </div>
                        <div className={"flex flex-row items-center justify-between w-4/5"}>
                            <h1>Current BMI</h1>
                            <h1>22.22 kg/m2</h1>
                        </div>
                        <div className={"flex flex-row items-center justify-between w-4/5"}>
                            <h1>Current BMI</h1>
                            <h1>22.22 kg/m2</h1>
                        </div>

                    </div>
                </div>
            </div>


            {/*Health Risk Prediction*/}
            <div
                className={"flex flex-col items-center justify-center gap-4 w-full h-full rounded-2xl shadow-xl p-4 bg-[#D4E9E9] "}>
                <div className={"flex flex-row font-semibold items-center justify-between w-full"}>
                    <h1 className={"text-lg"}>Health Risk Prediction</h1>
                    <p className={"underline text-sm "}>See Prediction</p>
                </div>
                <p>The predicted health risks provided are based on an algorithmic analysis of input data and general
                    health trends. Individual results may vary, and professional medical advice is recommended for
                    personalized guidance and treatment.</p>

            </div>


            {/*Compare Progress*/}
            <div
                className={"flex flex-col items-center justify-center gap-4 w-full h-full rounded-2xl shadow-xl p-6 bg-white"}>
                <div className={"flex flex-row font-semibold items-center justify-between w-full"}>
                    <h1 className={"text-3xl font-semibold"}>Compare Progress</h1>
                    <FaChevronDown/>
                </div>
                <h1 className={"w-full"}>Track your journey over time and identify areas for improvement.</h1>
                <div
                    className={"flex flex-row items-start justify-between w-full border border-black/10 rounded-2xl p-4"}>
                    <div className={"w-fit"}>
                        <Calendar/>
                    </div>
                    <div className={"flex flex-col gap-4 items-center justify-center p-5 w-full"}>
                        <h1 className={"w-4/5 font-medium text-lg"}>You walked <span className={"text-primary"}> 234 more steps </span> on
                            8th Feb </h1>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <Divider/>
                        <h1 className={"w-4/5 font-medium text-lg"}>You walked <span className={"text-primary"}> 234 more steps </span> on
                            8th Feb </h1>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <Divider/>
                        <h1 className={"w-4/5 font-medium text-lg"}>You walked <span className={"text-primary"}> 234 more steps </span> on
                            8th Feb </h1>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <div className={"flex flex-row w-4/5 font-semibold items-center justify-between"}>
                            <h1>8th Feb</h1>
                            <h1>4568/5000</h1>
                        </div>
                        <Divider/>

                    </div>


                </div>

            </div>


            {/*    Steps Progress*/}

            <div className={"flex flex-row items-start justify-between gap-4 w-full h-full"}>
                <div className={"flex flex-col items-center justify-center gap-4 w-full h-full"}>
                    <h1 className={"w-full font-bold text-xl"}>Step Progress</h1>
                    <MealGraph/>
                </div>
                <div>
                    <h1 className={"text-xl font-bold"}>Water Intake Progress</h1>
                    <div
                        className={"flex flex-col  items-center justify-center gap-4 w-full h-full rounded-2xl shadow-xl p-6 bg-white"}>
                        <div className={"flex flex-row font-semibold items-center gap-4  w-full"}>
                            <FaWineGlass className={"text-secondary"}/>
                            <div className={"flex flex-col w-full"}>
                                <h1 className={"text-lg"}> Today’s Water Intake</h1>
                                <h1 className={"text-sm"}>6/8 Cups</h1>


                            </div>
                        </div>
                        <Calendar className={"border p-4 rounded-2xl shadow-xl"}/>

                    </div>
                </div>

            </div>


            {/*    Calorie Count*/}

            <div className={"flex flex-col w-full gap-6 h-full"}>
                <h1 className={"font-semibold text-2xl "}>Calorie Count</h1>
                <div className={"w-full h-full flex flex-col items-center justify-center rounded-2xl p-5 shadow-xl"}>
                    <div className={"flex flex-row items-center justify-between w-full h-full"}>
                        <CalorieCountGraph/>
                        <CalorieCountGraph/>

                    </div>
                    <Divider/>
                    <Calendar className={"border p-4 rounded-2xl shadow-xl "}/>
                    <Divider/>
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
                </div>

            </div>


            {/*    Activity*/}
            <div className={"flex flex-col w-full gap-6 h-full"}>
                <h1 className={"font-semibold text-2xl"}>Activity</h1>
                <div className={"w-full h-full flex flex-col items-center justify-center rounded-2xl p-5 shadow-xl"}>
                    <div className={"flex flex-row items-start p-5 justify-between w-full h-full"}>
                        <div className={"flex flex-col items-center justify-start gap-4 w-full h-full"}>
                            <div className={"flex flex-col items-center justify-start gap-4 w-full h-full"}>
                                <h1 className={"w-full font-bold text-xl"}>Calories</h1>
                                <h2 className={"w-full font-semibold text-lg"}>472 kcal</h2>
                            </div>
                            <div className={"flex flex-col items-center justify-center gap-4 w-full h-full"}>
                                <h1 className={"w-full font-bold text-xl"}>Calories</h1>
                                <h2 className={"w-full font-semibold text-lg"}>472 kcal</h2>
                            </div>
                            <CalorieCountGraph/>
                        </div>
                        <div
                            className={"flex flex-col items-center justify-center gap-4 w-full h-full "}>

                            <Calendar className={"w-4/5 p-6 rounded-2xl shadow-xl"}/>
                            <Divider/>
                            <div className={"flex flex-col items-center justify-between w-4/5 h-full p-3 gap-6"}>
                                <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                                    <h1>Total Steps</h1>
                                    <h1>3445</h1>
                                </div>
                                <div className={"flex flex-row items-center justify-between w-full font-semibold"}>
                                    <h1>Target Steps</h1>
                                    <h1>3445</h1>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}
export default ProgressInsights