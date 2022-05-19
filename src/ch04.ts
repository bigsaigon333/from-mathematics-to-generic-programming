import { strict as assert } from "assert";

type line_segment = number;

function gcm0(a: line_segment, b: line_segment): line_segment {
  while (a != b) {
    if (b < a) a = a - b;
    else b = b - a;
  }

  return a;
}

assert.equal(gcm0(196, 42), 14);
assert.equal(gcm0(42, 196), 14);
assert.equal(gcm0(45, 6), 3);
assert.equal(gcm0(3, 2), 1);
assert.equal(gcm0(3, 1), 1);

function gcm1(a: line_segment, b: line_segment): line_segment {
  while (a != b) {
    while (b < a) a = a - b;
    [a, b] = [b, a];
  }

  return a;
}

assert.equal(gcm1(196, 42), 14);
assert.equal(gcm1(42, 196), 14);
assert.equal(gcm1(45, 6), 3);
assert.equal(gcm1(3, 2), 1);
assert.equal(gcm1(3, 1), 1);

function segment_remainder(a: line_segment, b: line_segment): line_segment {
  while (b < a) a = a - b;
  return a;
}

function gcm(a: line_segment, b: line_segment): line_segment {
  while (a != b) {
    a = segment_remainder(a, b);
    [a, b] = [b, a];
  }

  return a;
}

assert.equal(gcm(196, 42), 14);
assert.equal(gcm(42, 196), 14);
assert.equal(gcm(45, 6), 3);
assert.equal(gcm(3, 2), 1);
assert.equal(gcm(3, 1), 1);

function fast_segment_remainder(
  a: line_segment,
  b: line_segment
): line_segment {
  if (a <= b) return a;
  if (a - b <= b) return a - b;
  a = fast_segment_remainder(a, b + b);
  if (a <= b) return a;
  return a - b;
}

function fast_segment_gcm(a: line_segment, b: line_segment): line_segment {
  while (a != b) {
    a = fast_segment_remainder(a, b);
    [a, b] = [b, a];
  }

  return a;
}

assert.equal(fast_segment_gcm(196, 42), 14);
assert.equal(fast_segment_gcm(42, 196), 14);
assert.equal(fast_segment_gcm(45, 6), 3);
assert.equal(fast_segment_gcm(3, 2), 1);
assert.equal(fast_segment_gcm(3, 1), 1);

function fast_segment_remainder1(
  a: line_segment,
  b: line_segment
): line_segment {
  assert(b != 0);

  if (a < b) return a;
  if (a - b < b) return a - b;
  a = fast_segment_remainder1(a, b + b);
  if (a < b) return a;
  return a - b;
}

function largest_doubling(a: line_segment, b: line_segment): line_segment {
  assert(b != 0);

  while (a - b >= b) b = b + b;
  return b;
}

function half(c: line_segment): line_segment {
  return c >> 1;
}

function remainder(a: line_segment, b: line_segment): line_segment {
  assert(b != 0);

  if (a < b) return a;
  let c: line_segment = largest_doubling(a, b);
  a = a - c;
  while (c != b) {
    c = half(c);
    if (c <= a) a = a - c;
  }
  return a;
}

function quotient(a: line_segment, b: line_segment): number {
  assert(b > 0);

  if (a < b) return 0;
  let c: line_segment = largest_doubling(a, b);
  let n = 1;
  a = a - c;
  while (c != b) {
    c = half(c);
    n = n + n;
    if (c <= a) {
      a = a - c;
      n = n + 1;
    }
  }

  return n;
}
