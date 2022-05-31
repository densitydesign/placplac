import { inRange, round } from "lodash";

export function findRanges(min: number, max: number): { unit: number; ranges: [number, number][] } {
  if (max <= min) return { ranges: [[Math.min(min, max), Math.max(min, max)]], unit: Math.abs(max - min) };

  const ranges: [number, number][] = [];

  const diff = max - min;
  const digits = Math.floor(Math.log10(diff)) - 1;
  const p = Math.pow(10, digits);
  const unit = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50].map((n) => n * p).find((n) => inRange(diff / n, 5, 15));

  if (!unit) return { ranges: [[min, max]], unit: max - min };

  for (let i = Math.floor(min / unit); i <= max / unit; i++) {
    ranges.push([round(i * unit, -digits), round((i + 1) * unit, -digits)]);
  }

  return { unit, ranges };
}

export function shortenNumber(n: number): string {
  if (n === 0) return "0";
  if (n < 0) return "-" + shortenNumber(-n);

  const suffixes = ["", "k", "m", "b", "t"];
  const suffixNum = Math.floor(Math.log10(n) / 3);
  const shortValue = suffixNum ? +(n / Math.pow(1000, suffixNum)).toFixed(2) : n;

  return suffixes[suffixNum]
    ? (shortValue % 1 ? shortValue.toFixed(1) : shortValue) + suffixes[suffixNum]
    : n.toPrecision(3).replace(/\.?0+$/, "");
}

export function isNumber(v: unknown): boolean {
  if (typeof v === "number") return true;
  if (typeof v === "string") {
    return !isNaN(+v);
  }

  return false;
}
