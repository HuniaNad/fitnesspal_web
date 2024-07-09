'use client'
import React from 'react'
import Image from "next/image";
import LunchSection from "@/components/MealPlanner/LunchSection";
import TodayMealSection from "@/components/MealPlanner/TodayMealSection";
import NutritionSection from "@/components/MealPlanner/NutritionSection";

const MealPlannerScreen = () => {


    return (
        <div className=" flex flex-col justify-center items-center w-full h-full ">
            <Image src={"/images/logo_black.svg"} className={"w-44 h-44"} alt={""} width={100} height={100}/>
            <h1 className={"text-2xl font-bold "}>Meal Planner </h1>
            <div className={"flex flex-col w-full h-full items-center gap-6 justify-center"}>
                <h1 className={" text-lg font-bold w-full"}>
                    Hello Fatima!
                </h1>
                <p className={"w-full text-md font-semibold"}>Your Tailored Meal Plan Awaits! Let's Dig In</p>
                <LunchSection/>
                <TodayMealSection/>
                <TodayMealSection/>
                <TodayMealSection/>
                <NutritionSection/>

            </div>


        </div>
    )
}

export default MealPlannerScreen