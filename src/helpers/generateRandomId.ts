let idCounter = 0;
export const generateRandomId = (): string => `${(idCounter++).toString(16)}${Math.random().toString(16).slice(2)}`;
