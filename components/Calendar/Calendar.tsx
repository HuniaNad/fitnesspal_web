// components/WeekCalendar.tsx
"use client";
import { useState } from "react";

interface WeekCalendarProps {
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
    events: { date: Date; title: string }[];
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
                                                       selectedDate = new Date(),
                                                       onDateSelect,
                                                       events = [],
                                                   }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get the start and end dates of the week
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 6);

    const handleDateClick = (date: Date) => {
        onDateSelect?.(date);
        setCurrentDate(date);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                    {firstDayOfWeek.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                    {" - "}
                    {lastDayOfWeek.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="text-center text-gray-500 text-xs uppercase"
                    >
                        {day}
                    </div>
                ))}

                {[...Array(7)].map((_, index) => {
                    const date = new Date(firstDayOfWeek);
                    date.setDate(firstDayOfWeek.getDate() + index);
                    const isSelected = date.toDateString() === currentDate.toDateString();
                    const hasEvents = events.some(
                        (event) => event.date.toDateString() === date.toDateString()
                    );

                    return (
                        <div
                            key={index}
                            onClick={() => handleDateClick(date)}
                            className={`h-8 text-center rounded-full relative ${
                                isSelected ? "bg-blue-500 text-white" : "text-gray-800"
                            } ${
                                hasEvents && !isSelected
                                    ? "after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-red-500"
                                    : ""
                            } cursor-pointer hover:bg-gray-200`}
                        >
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeekCalendar;
