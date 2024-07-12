import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t;
}

export function round(value: number, decimals = 0) {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}

export function ordinal(n: number) {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}

export enum Trend {
  Rising = "RISING",
  Falling = "FALLING",
  Stable = "STABLE",
}

export function analyzeTrend(numbers: number[]): Trend {
  if (numbers.length < 2) {
    return Trend.Stable; // Not enough data to determine a trend
  }

  let rising = 0;
  let falling = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) {
      rising++;
    } else if (numbers[i] < numbers[i - 1]) {
      falling++;
    }
  }

  const threshold = numbers.length * 0.4; // 40% threshold for determining trend

  if (rising > threshold) {
    return Trend.Rising;
  } else if (falling > threshold) {
    return Trend.Falling;
  } else {
    return Trend.Stable;
  }
}
