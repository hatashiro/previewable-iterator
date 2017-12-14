# previewable-iterator

[![npm](https://img.shields.io/npm/v/previewable-iterator.svg?style=flat-square)](https://www.npmjs.com/package/previewable-iterator)
[![CircleCI branch](https://img.shields.io/circleci/project/github/utatti/previewable-iterator/master.svg?style=flat-square)](https://circleci.com/gh/utatti/previewable-iterator)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Previewable [Iterable/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) for JavaScript/TypeScript

## Install

``` shell
npm install previewable-iterator
```

## API

``` typescript
import {
  PreviewableIterable,
  previewable,
} from "previewable-iterator";
```

### `class PreviewableIterable`

`PreviewableIterable` implements `PreviewableIterable`, which means it provides
proper interface for both Iterable and Iterator. About the interface, please
refer to the following MDN documentation.

- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

#### `constructor(iterator: Iterator)`

It accepts an iterator and wraps it as `PreviewableIterable`.

However, rather than directly using `new PreviewableIterable(...)`, you may
prefer using the `previewable(...)` helper function.

#### `PreviewableIterable#preview()`

It additionally provides a `preview` to literally preview the result of the
iterable. In other words, it returns a previewed `{ value, done }` without
actually consuming an iteration step.

### `previewable(iterable: Iterable)`

It is a helper function for `PreviewableIterable`, accepts an iterable. It
creates an iterator from the iterable, and apply it to `PreviewableIterable`.

``` typescript
// e.g.
const iter = previewable([1, 2, 3, 4]);

iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.preview(); // { value: 3, done: false }
iter.preview(); // { value: 3, done: false }
iter.next(); // { value: 3, done: false }
```

## Development

``` shell
# formatting scripts (using Prettier)
npm run check-format
npm run format

# build TypeScript
npm run build

# test
npm run test
```

The formatting scripts are automatically executed before commit or push.

## License

[MIT](LICENSE)
