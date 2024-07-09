'use-client';
import React, { useEffect, useRef, useState } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import WeekCalendar from "@/components/Calendar/Calendar";
import { Exercise } from "@/components/WorkoutPlanner/workoutPlan";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { current } from "@reduxjs/toolkit";
import ErrorPrompt from "../ErrorAlert/error";

interface Item {
    title: string;
    exercisesByDay: {
        [day: number]: {
            exercises: Exercise[],
            completionStatus?: boolean;
        };
    };
}

interface StepTwoProps {
    selectedItem: Item | null;
}

interface RadioItem {
    title: string;
    sets: string;
    reps: string;
    completionStatus?: boolean;
    action: () => void;
}

const StepTwo = ({ selectedItem }: StepTwoProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Initialize with current date
    const [selectedExercise, setSelectedExercise] = useState(selectedItem);
    const [dayExerciseCompleted, setDayExerciseCompleted] = useState<boolean>(false);
    const [selectedWorkout, setSelectedWorkout] = useState({ exercise: "", reps: 0, sets: 0, completionStatus: false});
    const [radioItems, setRadioItems] = useState<RadioItem[]>([]);
    const [selectedRadioItem, setSelectedRadioItem] = useState<string>("");
    const [dayOfWeek, setDayOfWeek] = useState<number>(1);
    const [error, setError] = React.useState('');
    const router = useRouter()
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {}
    const workoutData = localStorage.getItem("workoutData");
    const workout = workoutData ? JSON.parse(workoutData) : {};

    useEffect(() => {  
        setSelectedExercise(workout);
        if (selectedItem) {
            updateRadioItems(selectedDate);
        }
    }, [selectedItem, selectedDate])

    const updateRadioItems = (date: Date | null) => {
        setDayOfWeek(date ? date.getDay() + 1 : 1); // Get day of the week (Sunday = 0, Monday = 1, etc.)
        if (selectedExercise === null) return;
        console.log("Selected item:", selectedExercise);
        console.log("Selected date:", dayOfWeek);
        console.log("exercises", selectedExercise?.exercisesByDay[dayOfWeek] || [])

        const exercisesForSelectedDay = selectedExercise?.exercisesByDay[dayOfWeek].exercises || [];
        console.log("selected exercises", exercisesForSelectedDay)

        const items: RadioItem[] = exercisesForSelectedDay?.length > 0
            ? exercisesForSelectedDay.map((exercise) => ({
                title: exercise.exercise,
                sets: exercise.sets.toString(), // Convert to string
                reps: exercise.reps.toString(), // Convert to string
                completionStatus: exercise.completionStatus,
                action: () => console.log("Action for", exercise.exercise),
            }))
            : [{
                title: "No Data for this day",
                sets: "",
                reps: "",
                completionStatus: false,
                action: () => {
                }
            }];
            console.log(items)

        setRadioItems(items);
    };

    // useEffect (()=> {
    //     setSelectedExercise(workout);
    //     updateRadioItems(selectedDate);
    // }, [])

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            let response;
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const data = {
                reps: selectedWorkout.reps,
                sets: selectedWorkout.sets
            };

            // Make the appropriate API call based on the selected exercise
            switch (selectedWorkout.exercise.toLowerCase()) {
                case "bicep curl (right)":
                    response = await axios.post('http://localhost:5000/start-right-curl', data, config);
                    break;
                case "bicep curl (left)":
                    response = await axios.post('http://localhost:5000/start-left-curl', data, config);
                    break;
                case "push ups":
                    response = await axios.post('http://localhost:5000/start-push-ups', data, config);
                    break;
                case "squat":
                    response = await axios.post('http://localhost:5000/start-squats', data, config);
                    break;
                case "sit ups":
                    response = await axios.post('http://localhost:5000/start-sit-ups', data, config);
                    break;
                case "pull ups":
                    response = await axios.post('http://localhost:5000/start-pull-ups', data, config);
                    break;
                default:
                    // Handle unsupported exercise
                    break;
            }

            if (response && response.data && response.data.message === "Success" && selectedExercise && selectedDate) {
                // Update completion status of the specific exercise
                const dayExercises = selectedExercise.exercisesByDay[dayOfWeek].exercises;
                const updatedExercises = dayExercises.map(exercise => {
                    if (exercise.exercise.toLowerCase() === selectedWorkout.exercise.toLowerCase()) {
                        exercise.completionStatus = true;
                    }
                    return exercise;
                });
                
                const currentData = JSON.parse(localStorage.getItem("workoutData") || "{}");
                currentData.exercisesByDay[dayOfWeek].exercises = updatedExercises;
                currentData.exercisesByDay[dayOfWeek].completionStatus = dayExerciseCompleted;
                localStorage.setItem("workoutData", JSON.stringify(currentData));
                updateRadioItems(selectedDate);

                // Check if all exercises of the day are completed
                const allExercisesCompleted = updatedExercises.every(exercise => exercise.completionStatus);
                console.log("All exercises completed:", allExercisesCompleted);

                // Update the completion status of the entire day
                if (allExercisesCompleted) {
                    selectedExercise.exercisesByDay[dayOfWeek].completionStatus = true;
                    localStorage.setItem("workoutData", JSON.stringify(selectedExercise));
                    setDayExerciseCompleted(true);
                    console.log("All exercises for the day are completed!")
                }
                else {
                    setDayExerciseCompleted(false);
                }

                // window.location.reload();
                // router.refresh();
            } else {
                console.log("Exercise start failed.");
                setError("Exercise start failed.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleRadioSelect = (item: RadioItem) => {
        setSelectedRadioItem(item.title);
        setSelectedWorkout({ ...selectedWorkout, exercise: item.title, reps: parseInt(item.reps), sets: parseInt(item.sets) });
        handleClick();
        item.action();
    };


    const events = [
        { date: new Date(2024, 1, 5), title: "Meeting" },
        { date: new Date(2024, 1, 12), title: "Birthday" },
        { date: new Date(2024, 1, 20), title: "Holiday" },
    ];

    function handleEnd() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("workoutData");
            window.location.reload()
        }
    }

    if (!selectedExercise) {
        return <div>Please select an item to see the details.</div>;
    }

    return (
        <div className={"flex flex-col w-full h-full items-center justify-center gap-6"}>
            <div className={"flex flex-row w-full h-full items-center justify-between"}>
                <div className={"flex flex-col gap-2 "}>
                    <h1 className={"text-2xl text-start font-bold w-full"}>Hello {user.name}!</h1>
                    <p className={"text-black/40 text-xs w-full"}>{selectedExercise.title} Workout Routine Awaits!</p>
                </div>
                <Button onClick={handleEnd}>End Workout</Button>
            </div>
            <div className={"flex flex-col flex-wrap gap-4 w-full h-full"}>
                <WeekCalendar events={events} onDateSelect={handleDateSelect} />
                <div className="flex flex-col gap-5">
                    {selectedExercise.exercisesByDay[dayOfWeek].completionStatus && <p className="text-xs text-center font-bold text-green-500">All exercises for the day are completed!</p>}
                    {radioItems && radioItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-row cursor-pointer items-center justify-between w-full rounded-2xl border shadow-lg p-5`}
                            onClick={() => !item.completionStatus && handleRadioSelect(item)}
                            style={{ backgroundColor: item.completionStatus ? "#E0FEE0" : "white" }}
                        >
                            <div className={"flex flex-col gap-3"}>
                                <h1 className={"text-xl font-bold"}>{item.title}</h1>
                                <div className={"flex flex-col items-start justify-center font-bold"}>
                                    <h1>Sets</h1>
                                    <p className={"text-black/40 text-xs"}>{item.sets}</p>
                                </div>
                                <div className={"flex flex-col items-start justify-center font-bold"}>
                                    <h1>Reps</h1>
                                    <p className={"text-black/40 text-xs"}>{item.reps}</p>
                                    {item.completionStatus && <p className="text-xs font-bold text-green-500">Completed</p>}
                                </div>
                                {/* Show completion status */}
                                
                            </div>
                            <ChevronRightRounded onClick={() => !item.completionStatus && handleClick()} />
                        </div>
                    ))}
                </div>
            </div>
           {/* {error && <ErrorPrompt message={error} />} */}
        </div>
    );
};

export default StepTwo;
