export const validateAge = (age: string) => {
    const ageNumber = parseInt(age);

    if (age && isNaN(ageNumber)){
        return "Age must be a positive number";
    }

    if (age && (ageNumber < 18 || ageNumber > 100)){
        return "Age must be between 18 and 100";
    }

    return null;
}

export const validateWeight = (weight: string) => {
    const weightNumber = parseInt(weight);

    if (weight && isNaN(weightNumber)){
        return "Weight must be a positive number";
    }

    if (weight && (weightNumber < 25 || weightNumber > 200)){
        return "Weight must be between 25 and 200";
    }

    return null;
}

export const validateTargetWeight = (weight: string) => {
    const userData = localStorage.getItem('healthProfileData');
    const user = userData ? JSON.parse(userData) : {};
    const currentHeight = parseInt(user.height);

    const targetWeight = parseInt(weight);
    const minimumIdealWeight = parseFloat((18.5 * (currentHeight / 100) * (currentHeight / 100)).toFixed(2));
    const maximumIdealWeight = parseFloat((24.9 * (currentHeight / 100) * (currentHeight / 100)).toFixed(2));

    console.log(targetWeight, minimumIdealWeight, maximumIdealWeight);

    if (weight && isNaN(targetWeight)){
        return "Weight must be a positive number";
    }

    if (weight && (targetWeight < minimumIdealWeight || targetWeight > maximumIdealWeight)){
        return `Weight must be between ${minimumIdealWeight} and ${maximumIdealWeight}`;
    }

    return null;
}

export const getCalorieRange = (currentWight: string , targetWeight: string) => {
    const currentWeightNumber = parseInt(currentWight);
    const targetWeightNumber = parseInt(targetWeight);

    if (currentWight && (isNaN(currentWeightNumber) || currentWeightNumber < 0)){
        return "Current weight must be a positive number";
    }

    if (targetWeight && (isNaN(targetWeightNumber) || targetWeightNumber < 0)){
        return "Target weight must be a positive number";
    }

    const minCaloriesPerDay = currentWeightNumber * 25;
    const maxCaloriesPerDay = targetWeightNumber * 25;
    
    return {minCaloriesPerDay: minCaloriesPerDay, maxCaloriesPerDay: maxCaloriesPerDay};
}

export const getCalorieGoal = () => {
    const healthProfileData = localStorage.getItem('healthProfileData');
    const healthProfile = healthProfileData ? JSON.parse(healthProfileData) : {};

    if (healthProfile.targetWeight && healthProfile.weight){
        const calorieRange = getCalorieRange(healthProfile.weight, healthProfile.targetWeight);
        if (typeof calorieRange !== 'string'){
            return parseFloat(((calorieRange.minCaloriesPerDay + calorieRange.maxCaloriesPerDay) / 2).toFixed(2));
        }
    }
    
    const calorieRange = getCalorieRange(healthProfile.weight, healthProfile.weight);
    if (typeof calorieRange !== 'string'){
        return parseFloat((calorieRange.minCaloriesPerDay / 2).toFixed(2));
    }

    return null;
}

export const validateHeight = (height: string) => {
    const heightNumber = parseInt(height);

    if (height && isNaN(heightNumber)){
        return "Height must be a positive number";
    }

    if (height && (heightNumber < 120 || heightNumber > 220)){
        return "Height must be between 120 and 220";
    }

    return null;
}

export const validateGender = (gender: string) => {
    const genderOptions = ['male', 'female', 'neutral'];

    if (gender && !genderOptions.includes(gender)){
        return "Gender must be Female, Male or Neutral";
    }

    return null;
}