import assert from "assert";

export function mark_sieve(
  arr: boolean[],
  first: number,
  last: number,
  factor: number
) {
  assert.ok(first !== last);

  arr[first] = false;
  while (last - first > factor) {
    first += factor;
    arr[first] = false;
  }
}
