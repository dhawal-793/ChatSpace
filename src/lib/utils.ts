import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function chatHrefConstructor(id1: string, id2: string) {
    const [sortedId1, sortedId2] = [id1, id2].sort()
    return `${sortedId1}--${sortedId2}`
}