export function generateRandomInteger(max: number, min: number = 0): number {
    if (max < min) return NaN;

    return Math.floor(Math.random() * (max - min + 1) + min)
}