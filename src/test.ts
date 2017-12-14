import { deepEqual as equal, notDeepEqual as notEqual } from "assert";
import { previewable } from "./index";

const tests = [
  function basicTest<T>(iterable: Iterable<T>): void {
    const iter = previewable(iterable);

    let preview: T | null = null;
    for (const item of iter) {
      if (preview) {
        equal(item, preview);
      }

      preview = iter.preview().value;
    }
  },

  function previewTwice<T>(iterable: Iterable<T>): void {
    const iter = previewable(iterable);

    let preview: T | null = null;
    for (const item of iter) {
      if (preview) {
        equal(item, preview);
      }

      iter.preview(); // throw away the result
      preview = iter.preview().value; // but same as above
    }
  },

  function previewNextNextPreview<T>(iterable: Iterable<T>): void {
    const iter = previewable(iterable);

    const preview = iter.preview();
    equal(iter.next(), preview);
    const next = iter.next();
    notEqual(next, preview);
    notEqual(iter.preview(), next);
  },
];

const test = <T>(x: Iterable<T> | (() => Iterable<T>)) =>
  tests.forEach(f => f(typeof x === "function" ? x() : x));

// instance tests
test([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
test("hello, world!");
test(function*() {
  yield 1;
  yield 2;
  yield* [3, 4, 5];
  yield 6;
  yield 7;
});
test(new Set([1, 2, 2, 3, 4, 1, 10, 6, 10]));
