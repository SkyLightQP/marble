export function range(start: number, end: number, step = 1): number[] {
  const array = [];
  // eslint-disable-next-line no-plusplus
  for (let i = start; i < end; ++i) {
    if (!(i % step)) {
      array.push(i);
    }
  }
  return array;
}
