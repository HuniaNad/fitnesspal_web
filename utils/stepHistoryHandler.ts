import { getDateAndMonth } from "./todayDate";

interface StepRecord {
    currentSteps: number;
    date: string;
    _id: string;
}

interface UserStepHistory {
    _id: string;
    userId: string;
    stepGoal: number;
    stepHistory: StepRecord[];
    __v: number;
}

export interface StepHistoryResult {
    steps: number[];
    maxSteps: number;
    maxStepsDay: string;
    maxStepsDate: {
        month: string;
        day: number;
    };
}

const formatStepHistory = (data: UserStepHistory[]): StepHistoryResult => {
    const result: number[] = Array(7).fill(0);
    let maxSteps = 0;
    let maxStepsDate = {month: '', day: 0};
    let maxStepsDay = '';

    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const dateMap: { [key: string]: number } = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentMonday);
        date.setDate(currentMonday.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        dateMap[dateString] = i;
    }

    data.forEach(user => {
        user.stepHistory.forEach(record => {
            const recordDate = new Date(record.date).toISOString().split('T')[0];
            if (dateMap.hasOwnProperty(recordDate)) {
                const index = dateMap[recordDate];
                result[index] = record.currentSteps;

                if (record.currentSteps > maxSteps) {
                    maxSteps = record.currentSteps;
                    maxStepsDate = getDateAndMonth(recordDate);
                    maxStepsDay = dayNames[new Date(record.date).getDay()];
                }
            }
        });
    });

    return {
        steps: result,
        maxSteps: maxSteps,
        maxStepsDate: maxStepsDate,
        maxStepsDay: maxStepsDay
    };
};

export const fetchStepHistory = async (userId: string): Promise<StepHistoryResult> => {
    const apiUrl = `http://localhost:8080/step-tracker/get-steps/${userId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserStepHistory[] = await response.json();
        return formatStepHistory(data);
    } catch (error) {
        console.error('Error fetching step history:', error);
        return {
            steps: Array(7).fill(0),
            maxSteps: 0,
            maxStepsDate: {month: '', day: 0},
            maxStepsDay: ''
        };
    }
};
