import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMono(value: number) {
  return new Intl.NumberFormat("es-MX", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

