/* tslint:disable no-bitwise */
export default function convertMinutesToTime(mins: number) {
  return `${`0${mins / 60 ^ 0}`.slice(-2)}:${(`0${mins % 60}`).slice(-2)}`;
}
