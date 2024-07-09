// app/page.tsx
'use client'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef } from 'react';

const options: Highcharts.Options = {
    chart: {
        type: 'spline',
        backgroundColor: 'white',
    },
    credits: {
        enabled:false
    },
    title: {
        text: "",
    },
    xAxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'],
        tickLength: 0,
    },
    yAxis: {
        title: { text: null },
        gridLineWidth: 0,
        min: 190,
        max: 270,
        tickInterval: 20,
    },
    series: [
        {
            type: 'spline',  // <-- Add the 'type' property here
            name: 'Data',
            data: [198, 220, 195, 255, 260, 215, 235, 200, 250, 265],
            color: '#00CED1',
        },
    ],
    legend: { enabled: false },
};

export default function CalorieCountGraph() {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <div className="w-full max-w-screen-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    );
}
