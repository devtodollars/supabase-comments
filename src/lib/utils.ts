import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function getRelativeTime(targetDate: Date) {
  // Parse the date-time string to a Date object
  const now = new Date();

  // Calculate difference in milliseconds
  const diffInMs = Number(now) - Number(targetDate);

  const diffInSeconds = Math.round(diffInMs / 1000);
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Handle hours and minutes for differences up to 24 hours
  if (diffInHours < 24) {
    if (diffInHours === 0 && diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, 'minute');
    }
    return rtf.format(-diffInHours, 'hour');
  }

  // Handle days for differences exceeding 24 hours
  if (diffInDays >= 1) {
    return rtf.format(-diffInDays, 'day');
  }

  // Further cases as needed (weeks, months, years)
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);

  if (Math.abs(diffInYears) > 0) {
    return rtf.format(-diffInYears, 'year');
  } else if (Math.abs(diffInMonths) > 0) {
    return rtf.format(-diffInMonths, 'month');
  } else if (Math.abs(diffInWeeks) > 0) {
    return rtf.format(-diffInWeeks, 'week');
  }
}
