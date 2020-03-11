export type Int = number;
export type Float = number;

export const floatStr = (value?: Float) => (!!value ? value : 0).toFixed(2);
