export function validateCardName(value: string): string {
    if (value && !(value.toString()).match(/^[a-zA-Z\s]*$/)) {
        return 'Name should only contain alphabets and spaces';
    }
    return '';
}

export function validateCardNumber(number: string): string {
    // Remove spaces and hyphens
    number = number.replace(/\s/g, '').replace(/-/g, '');

    // Check if the input is all digits and has a valid length
    if (!/^\d{13,16}$/.test(number)) {
        return 'Invalid card number';
    }

    // Use Luhn algorithm to validate the number
    let total = 0;
    let even = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i), 10);
        if (even) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        total += digit;
        even = !even;
    }

    if (total % 10 !== 0) {
        return 'Invalid card number';
    }

    return '';
}

export function validateCardExpiry(value: string): string {
    if (value && (!(value.toString()).match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/) || value.length !== 5)) {
        return 'Expiry should be in MM/YY format';
    }
    return '';
}

export function validateCardCvc(value: string): string {
    if (value && (!(value.toString()).match(/^[0-9]*$/) || value.length !== 3)) {
        return 'CVC should only contain numbers and should be 3 digits long';
    }
    return '';
}