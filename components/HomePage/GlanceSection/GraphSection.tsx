'use client'

import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options: Highcharts.Options = {
    title: {
        text: 'My chart',
    },
    chart: {
        className: 'w-full h-full bg-white'
    },
    xAxis: {
        type: 'category', // Set the type to 'category' for vertical bars
    },
    series: [
        {
            type: 'bar', // Changed type to 'bar' for bar chart
            name: 'Series 1',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            color: '#000000',
        },
    ],
};

const GraphSection = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props}
        />
    );
};

export default GraphSection;
