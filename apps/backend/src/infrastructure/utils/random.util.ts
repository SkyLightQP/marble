export function shuffle<T extends unknown[]>(array: T): T {
  return array.sort(() => Math.random() - 0.5);
}
