import InfoTiles from "@/components/HomePage/GlanceSection/InfoTiles";
import { getFormattedDate } from "@/utils/todayDate";
import React from "react";


const OverviewSection = ({items}: { items: { value: string, description: string }[] }) => {
    return (
        <div className={"flex flex-col gap-4 w-full items-center justify-center h-full"}>
            <h1 className={"w-full text-start font-semibold text-xl"}>Lets see {getFormattedDate()} at a glance</h1>

            <div className={"flex flex-row items-center w-full  justify-start gap-6"}>
                {items && items.map((item, index) => {
                    return (

                        <InfoTiles key={index} title={item.value} description={item.description}/>
                    )
                })}
            </div>
        </div>
    )
}
export default OverviewSection