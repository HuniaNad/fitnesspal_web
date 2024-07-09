import { events } from '../utils/events';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:8080'); // Change the URL to your backend URL

// Function to handle 'nutritionalDataUpdate' event
const handleNutritionalDataUpdate = (data: any) => {
    const existingData = localStorage.getItem('nutritionalData');
    let newData = data;

    if (existingData) {
        const parsedExistingData = JSON.parse(existingData);
        newData = { ...parsedExistingData, ...data };
    }

    localStorage.setItem('nutritionalData', JSON.stringify(newData));
    console.log('Nutritional data updated:', newData);
};

const handleStepsUpdate = (data: any) => {
    localStorage.setItem('steps', JSON.stringify(data));
    console.log('Steps data updated:', data);
}

// Function to handle 'healthDataUpdate' event
const handleHealthDataUpdate = (data: any) => {
    const existingData = localStorage.getItem('healthData');
    let newData = data;

    if (existingData) {
        const parsedExistingData = JSON.parse(existingData);
        newData = { ...parsedExistingData, ...data };
    }

    localStorage.setItem('healthData', JSON.stringify(newData));
    console.log('Health data updated:', newData);
};

// Listen for 'nutritionalDataUpdate' event from backend
socket.on('nutritionalDataUpdate', handleNutritionalDataUpdate);

// Listen for 'healthDataUpdate' event from backend
socket.on('healthDataUpdate', handleHealthDataUpdate);


socket.on(events.UPDATE_STEPS, (data: any) => {
    localStorage.setItem('steps', JSON.stringify(data));
    console.log('Steps data updated:', data);
});

socket.on(events.UPDATE_WATER_INTAKE, (data: any) => {
    localStorage.setItem('waterIntake', JSON.stringify(data));
    console.log('Water intake data updated:', data);
});

socket.on(events.UPDATE_CALORIES, (data: any) => {
    localStorage.setItem('calories', JSON.stringify(data));
    console.log('Calories data updated:', data);
});