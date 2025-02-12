import {parseISO, setHours, setMinutes} from 'date-fns';

export const useUtils = () => {

    const parseJwt = (token: string) => {
        if(process.server){
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const displayDuration = (duration: number) => {
        const hours = Math.floor(duration/60);
        const minutes = duration % 60;
        return `${hours ? (hours + ' orë') : ''} ${minutes ? (minutes + ' minuta') : ''}`
    }

    const addZero = (num: number) => {
        const stringNum = `${num}`
        if(stringNum.length === 1)
            return `0${stringNum}`;
        return stringNum;
    }

    const addTimeToDate = (date: string, start_time: string) => {

// Input dates
//         const date = "2024-10-28 00:00";
//         const start_time = "2024-10-27T07:30:00.000Z";

// Parse the input dates
        const parsedDate = parseISO(date.replace(" ", "T")); // Convert to ISO format
        const parsedStartTime = parseISO(start_time);

// Extract hours and minutes from start_time
        const hours = parsedStartTime.getHours();
        const minutes = parsedStartTime.getMinutes();

// Set the extracted hours and minutes to the parsed date
        return setHours(setMinutes(parsedDate, minutes), hours)

    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return {
        parseJwt,
        addTimeToDate,
        addZero,
        displayDuration,
        copyToClipboard,
    }
}
