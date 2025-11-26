export type SeededRandom = () => number;

export const createSeededRandom = (seed: number = 1): SeededRandom => {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 48271) % 2147483647;
    return value / 2147483647;
  };
};

export const pick = <T>(items: T[], rand: SeededRandom): T => {
  const index = Math.floor(rand() * items.length);
  return items[index];
};

export const range = (count: number): number[] => Array.from({ length: count }, (_, i) => i);
