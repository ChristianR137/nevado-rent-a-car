import { differenceInCalendarDays, parseISO } from 'date-fns';

export const calculateDays = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const diff = differenceInCalendarDays(parseISO(endDate), parseISO(startDate));
    return diff > 0 ? diff : 0;
};
