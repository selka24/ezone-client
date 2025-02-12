// utils/dateUtils.ts
import { startOfWeek, endOfWeek, subMonths, startOfMonth, endOfMonth, format, type Locale } from 'date-fns';

interface WeekRange {
    start: Date;
    end: Date;
}

export function getCurrentWeekRange(weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1): WeekRange {
    const today = new Date();

    return {
        start: startOfWeek(today, { weekStartsOn }),
        end: endOfWeek(today, { weekStartsOn })
    };
}

export function getCurrentMonthRange() {
    const today = new Date();

    return {
        start: startOfMonth(today),
        end: endOfMonth(today),
    }
}

export function getLastThreeMonthsRange() {
    const today = new Date();

    // Go back 3 months from current date
    const startMonth = subMonths(today, 2);

    // Get first day of the oldest month
    const start = startOfMonth(startMonth);

    // Get last day of the most recent completed month
    const end = endOfMonth(today);

    return { start, end };
}

// Optional: Formatted version with string return type
interface FormattedWeekRange {
    start: string;
    end: string;
}

export function getFormattedCurrentWeekRange(
    formatString = 'yyyy-MM-dd',
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1,
    options?: { locale?: Locale }
): FormattedWeekRange {
    const { start, end } = getCurrentWeekRange(weekStartsOn);

    return {
        start: format(start, formatString, options),
        end: format(end, formatString, options)
    };
}