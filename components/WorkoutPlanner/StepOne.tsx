import { Tag } from "antd";
import { useState } from "react";
import workoutData, { Exercise, WorkoutData } from "@/components/WorkoutPlanner/workoutPlan";

interface Item {
    title: string;
    exercisesByDay: {
        [day: number]: {
            exercises: Exercise[],
            completionStatus?: boolean
        }
    };
}

export interface StepOneProps {
    onItemSelected: (item: Item) => void; // Callback prop type
}

const StepOne: React.FC<StepOneProps> = ({ onItemSelected }) => {


    const items: Item[] = [
        "Shoulders", "Legs", "Chest", "Back", "Arms", "Calf", "Abs", "Triceps", "Biceps"
    ].map((title) => {
        let muscleGroupKey: keyof WorkoutData | undefined;
        switch (title) {
            case "Shoulders":
                muscleGroupKey = "shoulder";
                break;
            case "Legs":
                muscleGroupKey = "legs";
                break;
            case "Chest":
                muscleGroupKey = "chest";
                break;
            case "Back":
                muscleGroupKey = "back";
                break;
            case "Arms":
                muscleGroupKey = "arms";
                break;
            case "Abs":
                muscleGroupKey = "core";
                break;
            // ... (handle other cases if needed)
        }

        const exercisesByDay: { [day: number]: { exercises: Exercise[], completionStatus?: boolean } } = {};

        if (muscleGroupKey) {
            // Gather exercises, maintaining day grouping
            for (const day in workoutData[muscleGroupKey]) {
                exercisesByDay[day] = workoutData[muscleGroupKey][day]
            }
        }

        return {
            title,
            exercisesByDay,
        };
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const toggleTagSelection = (index: number) => {
        setSelectedIndex(index);
        onItemSelected(items[index]); // Call the callback
    };

    return (

        <div className={"flex  flex-col w-full h-full items-center justify-center gap-6"}>
            <h1 className={"text-2xl w-full text-start font-bold"}>Workout Routines</h1>

            <p className={"text-black/40  w-full text-xs"}>Tailored exercise plans for you</p>
            <div className={"flex flex-col cursor-pointer gap-4 w-full h-full overflow-y-scroll"}>
                {items && items.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                        <div
                            onClick={() => {
                                toggleTagSelection(index);
                                console.log(item);

                            }}
                            key={index}
                            className={`flex ${isSelected ? 'backgroundColor font-bold text-white' : 'bg-white text-black'} flex-col gap-4 w-full rounded-2xl p-6 shadow-lg`}
                        >
                            <h1 className={"text-lg font-bold"}>{item.title}</h1>

                            {/*<div className={"flex flex-row"}>*/}
                            {/*    {item.exercisesByDay && Object.entries(item.exercisesByDay).map(([day, exercises]) => (*/}
                            {/*        <div key={day}>*/}
                            {/*            <h2 className="text-lg font-semibold">Day {day}</h2>*/}
                            {/*            <div className="flex flex-wrap gap-2">  /!* Wrap tags for better layout *!/*/}
                            {/*                {exercises.map((exercise, index) => (*/}
                            {/*                    <Tag*/}
                            {/*                        className={`border-primary cursor-pointer rounded-2xl px-2 py-1 ${*/}
                            {/*                            isSelected ? "backgroundColor font-bold text-white" : "bg-white text-black"*/}
                            {/*                        }`}*/}
                            {/*                        key={index}*/}
                            {/*                    >*/}
                            {/*                        {exercise.exercise}*/}
                            {/*                    </Tag>*/}
                            {/*                ))}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    );
                })}
                {/*{tags && tags.map((tag, index) => {*/}
                {/*    const isSelected = selectedTags.includes(index);*/}

                {/*    return (*/}
                {/*        <Tag*/}
                {/*            className={`border-primary cursor-pointer rounded-2xl px-2 py-1 ${isSelected ? 'backgroundColor font-bold text-white' : 'bg-white text-black'}`}*/}
                {/*            key={index}*/}
                {/*            onClick={() => toggleTagSelection(index)} // Assuming you have a function to toggle tag selection*/}
                {/*        >*/}
                {/*            {tag.title}*/}
                {/*        </Tag>*/}
                {/*    );*/}
                {/*})}*/}

            </div>
            {/*<Button className={"backgroundColor "} size={"large"}>Get Meal Plan</Button>*/}

        </div>
    )
}
export default StepOne