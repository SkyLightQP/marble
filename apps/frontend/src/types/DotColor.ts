const dotColors = ['red', 'blue', 'green', 'yellow'] as const;
export type DotColorTuple = typeof dotColors;
export type DotColor = (typeof dotColors)[number];
