export const inputFieldValidation = (value: string | number, type: string): string | number => {
    if (type === 'number') {
        return Number(value) > 0 ? value : '';
    }

    return value;
}