type Field = {
    label: string;
    value: string | number | boolean | null | undefined;
}

export const requiredFieldsHandler = (fields: Field[]): boolean | string => {
    for (const field of fields) {
        if (!field.value) {
            return `Field '${field.label}' is required.`;
        }
    }
    return true;
}
