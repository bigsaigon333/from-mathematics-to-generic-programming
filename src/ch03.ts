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
