// Function to validate the email field
export const validateEmail = (email: string): string | null => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email && !emailRegex.test(email)) {
        return "Email is invalid";
    }

    return null; // Return null if the email is valid
}

// Function to validate the password field
export const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password && !passwordRegex.test(password)) {
        return "Password must contain at least 8 characters, including one letter, one number and one special character";
    }

    return null; // Return null if the password is valid
}

// Function to validate the password confirmation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if ((password && confirmPassword) && password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null; // Return null if the password is valid
}

// Function to validate the name field
export const validateName = (name: string): string | null => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (name && !nameRegex.test(name)) {
        return "Name must contain only alphabets"
    }

    return null; // Return null if the name is valid
}