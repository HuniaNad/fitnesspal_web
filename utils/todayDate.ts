export function getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
    } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
    }

    return `${day}${daySuffix} ${month}`;
}

export const getDateAndMonth = (date: string): { month: string, day: number } => {
    const [year, month, day] = date.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month, 10) - 1];

    return {
        month: monthName,
        day: parseInt(day, 10)+1
    };
}

export const getCardDate = (date: string): Date => {
    let [monthString, yearString] = date.split('/');
    let month = parseInt(monthString, 10);
    let year = parseInt(yearString, 10);

    const currentYear = new Date().getFullYear();
    const baseYear = Math.floor(currentYear / 100) * 100;

    if (year + baseYear < currentYear) {
        year += 100;
    }

    return new Date(year + baseYear, month - 1);
}

export const convertDateToString = (date: Date | string): string => {
    date = new Date(date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    const monthString = month < 10 ? `0${month}` : `${month}`;
    const yearString = year < 10 ? `0${year}` : `${year}`;

    return `${monthString}/${yearString}`;
}