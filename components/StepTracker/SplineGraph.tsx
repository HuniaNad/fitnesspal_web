'use client'

import React, { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchStepHistory, StepHistoryResult } from '@/utils/stepHistoryHandler'; // Ensure this path is correct
import { getDateAndMonth, getFormattedDate } from '@/utils/todayDate';
import { StepData } from '../MealPlanner/MealGraph';

const SplineGraph = ({setMaxSteps}: {setMaxSteps: any}, props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [data, setData] = useState<StepHistoryResult>();
    const userData = localStorage.getItem('userData');
    const userId = userData ? JSON.parse(userData).id : null;

    useEffect(() => {
        const getStepHistory = async () => {
            const stepHistory = await fetchStepHistory(userId);
            if (stepHistory) setData(stepHistory);
        }

        getStepHistory();
    }, []);

    useEffect(() => {
        const stepData = localStorage.getItem('stepData');
        const updatedStepData = stepData && data && { 
            ...JSON.parse(stepData), 
            maxSteps: data.maxSteps,
            maxStepsDate: data.maxStepsDate,
            maxStepsDay: data.maxStepsDay
        };
        if (updatedStepData) {
            localStorage.setItem('stepData', JSON.stringify(updatedStepData));
            setMaxSteps({
                maxSteps: data.maxSteps,
                maxStepsDate: data.maxStepsDate,
                maxStepsDay: data.maxStepsDay
            });
        }

    }, [data]);

    const options: Highcharts.Options = {
        title: {
            text: 'Weekly Step History',
        },
        chart: {
            backgroundColor: 'transparent',
            className: "",
            borderRadius: 20,
            plotBorderWidth: 0
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su','Mo'],
            type: 'category'
        },
        series: [
            {
                type: 'spline', // Changed type to 'bar' for bar chart
                data: (data !== undefined && data.steps.length > 0) ? data.steps : [1, 2, 3, 4, 5, 6, 7],
                color: '#BE9FFD',
                dashStyle: 'Solid',
            },
        ],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props}
        />
    );
};

export default SplineGraph;
