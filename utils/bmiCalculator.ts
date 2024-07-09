import { colors } from "@/public/colors/colors";
import { ResetBMIType } from "@/types";

export const validateWeight = (weight: number): ResetBMIType | null => {
    if (weight > 200 || weight < 25) {
        return {
            bmi: 0,
            message: 'Weight range: 25 - 200 kg!',
            color: colors.purple
        }
    }
    
    return null;
}

export const validateHeight = (height: number): ResetBMIType | null => {
    if (height > 220 || height < 120) {
        return {
            bmi: 0,
            message: 'Height range: 120 - 220 cm!',
            color: colors.purple
        }
    }

    return null;
}

export const validateWeightAndHeight = (weight: number, height: number): ResetBMIType | null => {
    if (weight <= 0 || height <= 0) {
        return {
            bmi: 0,
            message: '',
            color: colors.purple
        }
    }

    return null;
}

export const calculateBMI = (weight: number, height: number): number => {
    const heightinMeters = height / 100;
    const bmi = Number.parseFloat((weight / (heightinMeters * heightinMeters)).toFixed(2));

    return bmi;
}

export const validateBMI = (bmi: number): ResetBMIType => {
    if (bmi < 18.5) {
        return {
            message: 'Need to gain weight!',
            color: colors.pink
        }
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        return {
            message: 'Normal weight!',
            color: colors.green
        }
    }
    else {
        return {
            message: 'Need to lose weight!',
            color: colors.pink
        }
    }
}

export const handleBMIStatus = (bmi: any) => {
    let bmiFloat;

    if (bmi === '') {
        return 'Your BMI is not available'
    } else {
        bmiFloat = parseFloat(bmi)
    }

    if (bmiFloat < 18.5) {
        return 'Your BMI is below the normal range'
    }
    else if (bmiFloat >= 18.5 && bmiFloat < 24.9) {
        return 'Your BMI is within the normal range'
    }
    else {
        return 'Your BMI is above the normal range'
    }
}