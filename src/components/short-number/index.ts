export default function shortNumber(number: number) {
  return number >= 1e3
    ? (number / 1e3).toFixed(number >= 1e5 ? 0 : 1) + 'k'
    : number;
}
