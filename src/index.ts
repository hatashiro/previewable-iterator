export class PreviewableIterable<T> implements IterableIterator<T> {
  private iterator: Iterator<T>;
  private previewedResult: IteratorResult<T> | null = null;

  constructor(iterator: Iterator<T>) {
    this.iterator = iterator;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    if (this.previewedResult) {
      const result = this.previewedResult;
      this.previewedResult = null;
      return result;
    } else {
      return this.iterator.next();
    }
  }

  preview(): IteratorResult<T> {
    if (!this.previewedResult) {
      this.previewedResult = this.iterator.next();
    }
    return this.previewedResult;
  }
}

export function previewable<T>(iterable: Iterable<T>): PreviewableIterable<T> {
  return new PreviewableIterable(iterable[Symbol.iterator]());
}
