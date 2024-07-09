const DailyTarget = ({stepGoal}: {stepGoal: number}) => {
    return (
        <div
            className={"flex flex-col items-center border shadow-lg rounded-2xl p-5 gap-6 justify-center w-full h-full"}>
            <h1 className={"text-lg font-medium "}>Your Daily Target</h1>
            <h1 className={"text-secondary font-semibold text-md "}>{stepGoal}</h1>
        </div>
    )
}
export default DailyTarget