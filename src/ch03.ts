import assert from "assert";

export function mark_sieve(
  arr: boolean[],
  first: number,
  last: number,
  factor: number
): void {
  assert.ok(first !== last);

  arr[first] = false;
  while (last - first > factor) {
    first += factor;
    arr[first] = false;
  }
}

export function sift0(arr: boolean[], n: number): void {
  arr.fill(true);

  let i = 0;
  let index_square = 3;

  while (index_square < n) {
    if (arr[i]) {
      mark_sieve(arr, index_square, n, i + i + 3);
    }
    ++i;
    index_square = 2 * i * (i + 3) + 3;
  }
}

export function sift1(arr: boolean[]): void {
  arr.fill(true);

  let last = arr.length;

  let i = 0;
  let index_square = 3;
  let factor = 3;

  while (index_square < arr.length) {
    if (arr[i]) {
      mark_sieve(arr, index_square, last, factor);
    }
    ++i;
    factor = i + i + 3;
    index_square = 2 * i * (i + 3) + 3;
  }
}

export function sift(arr: boolean[]): void {
  arr.fill(true);

  let i = 0;
  let index_square = 3;
  let factor = 3;

  while (index_square < arr.length) {
    if (arr[i]) {
      mark_sieve(arr, index_square, arr.length, factor);
    }
    ++i;
    index_square += factor;
    factor += 2;
    index_square += factor;
  }
}

const value = (i: number): number => 2 * i + 3;
const index = (v: number): number => Math.floor((v - 3) / 2);
const prime_numbers = (arr: boolean[]): number[] =>
  [...arr.entries()].filter(([, v]) => v).map(([i]) => value(i));

const pi = (n: number): number => {
  if (n <= 1) return 0;
  if (n <= 4) return 1;

  const arr = Array(index(n));
  sift(arr);

  return prime_numbers(arr).length + 1;
};

const max = 107;
let sum = 0;
for (let i = 1; i <= 107; i++) {
  sum += Math.abs(pi(i) - (Math.floor(i / 4) + 2)) ** 2;
}
const average = sum / max;

console.log(average);
