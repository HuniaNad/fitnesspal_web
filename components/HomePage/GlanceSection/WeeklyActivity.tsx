import Link from "next/link";
import GraphSection from "@/components/HomePage/GlanceSection/GraphSection";

const WeeklyActivity = ({children}: { children?: React.ReactNode }) => {
    return (
        <div className={"flex flex-col items-center justify-center gap-4 w-full h-full"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <h3>Weekly Activity</h3>
                <Link href={"#"} className={"text-primary"}>View All</Link>
            </div>
            <div
                className={"flex flex-row items-center justify-center rounded-2xl border shadow-lg p-4 gap-4 w-full h-fit"}>
                <div className={"flex flex-col gap-2 items-center justify-start w-fit h-full"}>
                    <div className={"flex flex-col gap-2 w-full "}>
                        <h1 className={"font-semibold text-lg text-start"}>Calories</h1>
                        <p className={"font-medium text-md text-start"}>472 kcal</p>
                    </div>
                    <div className={"flex flex-col gap-2 w-full "}>
                        <h1 className={"font-semibold text-lg text-start"}>Calories</h1>
                        <p className={"font-medium text-md text-start"}>472 kcal</p>
                    </div>
                </div>
                <div className={"w-full"}>
                    {
                        children? children : <GraphSection/>
                    }
                </div>

            </div>

        </div>
    )
}
export default WeeklyActivity
