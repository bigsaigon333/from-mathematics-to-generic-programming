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
