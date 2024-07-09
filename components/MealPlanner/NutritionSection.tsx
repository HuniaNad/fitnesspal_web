import {GiMeatCleaver} from "react-icons/gi";
import {Button, Divider, Progress} from "antd";

const NutritionSection = () => {
    return (
        <div className={"flex flex-col items-center justify-center gap-6 w-full h-full"}>
            <h1 className={"w-full font-bold text-lg"}>
                Today Meal Nutritions
            </h1>
            <div
                className={"flex flex-col items-center justify-center  w-full h-full shadow-lg border rounded-2xl p-6"}>

                <div className={"flex flex-row items-center justify-between w-full"}>
                    <h1 className={"text-sm text-black/40"}>Calories
                        </h1>
                    <h1 className={"text-sm text-black/40"}>320 kCal</h1>
                </div>
                <Progress strokeColor={"#BE9FFD78"} showInfo={false} percent={30} />

            </div><div
                className={"flex flex-col items-center justify-center  w-full h-full shadow-lg border rounded-2xl p-6"}>

                <div className={"flex flex-row items-center justify-between w-full"}>
                    <h1 className={"text-sm text-black/40"}>Calories
                        </h1>
                    <h1 className={"text-sm text-black/40"}>320 kCal</h1>
                </div>
                <Progress strokeColor={"#BE9FFD78"} showInfo={false} percent={30} />

            </div><div
                className={"flex flex-col items-center justify-center  w-full h-full shadow-lg border rounded-2xl p-6"}>

                <div className={"flex flex-row items-center justify-between w-full"}>
                    <h1 className={"text-sm text-black/40"}>Calories
                        </h1>
                    <h1 className={"text-sm text-black/40"}>320 kCal</h1>
                </div>
                <Progress strokeColor={"#BE9FFD78"} showInfo={false} percent={30} />

            </div><div
                className={"flex flex-col items-center justify-center  w-full h-full shadow-lg border rounded-2xl p-6"}>

                <div className={"flex flex-row items-center justify-between w-full"}>
                    <h1 className={"text-sm text-black/40"}>Calories
                        </h1>
                    <h1 className={"text-sm text-black/40"}>320 kCal</h1>
                </div>
                <Progress strokeColor={"#BE9FFD78"} showInfo={false} percent={30} />

            </div>

        </div>
    )
}

export default NutritionSection