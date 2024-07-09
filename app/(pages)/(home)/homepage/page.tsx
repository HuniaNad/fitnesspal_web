'use client'

import requireAuth from '@/config/auth'
import React, { useEffect } from 'react'
import OverviewSection from "@/components/HomePage/GlanceSection/OverviewSection";
import BmiRangeSection from "@/components/HomePage/GlanceSection/BmiRangeSection";
import GetBackSection from "@/components/HomePage/TrainingSection/GetBackSection";

const HomePage = ({ title = "Home" }: { title?: string }) => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : {};
  const healthProfileData = localStorage.getItem("healthProfileData");
  const healthProfile = healthProfileData ? JSON.parse(healthProfileData) : {};

  const items = [
    {
      value: healthProfile.weight ? `${healthProfile.weight} kg` : "0 kg",
      description: "Current Weight"
    }, {
      value: healthProfile.bmi ? `${healthProfile.bmi} kg/m2` : "0 kg/m2",
      description: "Current BMI"
    }, {
      value: healthProfile.height ? `${healthProfile.height} cm` : "0 cm",
      description: "Current Height"
    }
  ]
  return (
    <div className={"flex flex-col gap-4 w-full h-full items-center justify-center"}>
      <h1 className={"w-full text-start font-semibold text-2xl capitalize"}>Hey {user.name}!</h1>
      <h2 className={"text-md text-black/30 w-full"}>Welcome Back</h2>
      <div className={"flex flex-row  justify-between h-full w-full gap-12"}>
        <div className={'flex flex-col items-center justify-center w-full h-full  gap-6'}>
          <OverviewSection items={items} />
          <BmiRangeSection bmi={healthProfile.bmi? healthProfile.bmi : ''} />
        </div>

        <div className={'flex flex-col items-center justify-center  w-full h-full gap-6'}>
          <GetBackSection />
        </div>


      </div>
    </div>
  )
}

export default requireAuth(HomePage)