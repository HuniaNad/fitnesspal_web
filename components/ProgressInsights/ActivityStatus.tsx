// app/page.tsx
'use client';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

const options: Highcharts.Options = {
    chart: {
        type: "column",
        backgroundColor: "white",
    },
    title: { text: "" },
    xAxis: {
        categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        lineColor: "transparent",
        tickColor: "transparent",
    },
    yAxis: {
        title: { text: null },
        gridLineWidth: 0,
        labels: { enabled: false },
        maxPadding: 0.4,
        minPadding: 0.4,
    },
    plotOptions: {
        column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0.1, // Adjust for spacing between columns
            color: "black",
            // tooltip: {
            //     enabled: false, // Disable tooltips for columns
            // },
            dataLabels: {
                enabled: true,
                align: "center",
                verticalAlign: "bottom",
                y: -10, // Adjust for label positioning
                style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white",
                },
                // formatter: function () {
                //     return this.y !== undefined && this?.y > 0 ? this.y : null;
                // },
            },
        },
    },
    series: [
        {
            type: "column",
            name: "Activity",
            data: [80, 200, 60, 130, 170, 90, 210],
            showInLegend: false,
        },
    ],
    legend: { enabled: false },
};

export default function ActivityTracker() {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-80">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Activity</h2>
                    <p className="text-gray-600">Calories</p>
                    <p className="text-2xl font-bold">472 kcal</p>
                    <p className="text-gray-600">Time</p>
                    <p className="text-lg">1:03:30</p>
                </div>
                <div className="text-right">
                    <h2 className="text-lg font-semibold">February 2024</h2>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>
                </div>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
            <div className="mt-4 border-t pt-2 flex justify-between">
                <div>
                    <p className="text-gray-600">Calories Burned</p>
                    <p className="text-lg font-bold">882 kcal</p>
                </div>
                <div>
                    <p className="text-gray-600">Time Spent</p>
                    <p className="text-lg font-bold">1:45:00</p>
                </div>
            </div>
        </div>
    );
}
