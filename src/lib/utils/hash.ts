export function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed: number | string): () => number {
  let state = typeof seed === "number" ? seed >>> 0 : hashString(seed);

  if (state === 0) {
    state = 0x6d2b79f5;
  }

  return () => {
    state += 0x6d2b79f5;

    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);

    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashToIndex(seed: string, length: number): number {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error(`Length must be a positive integer, received ${length}`);
  }

  return hashString(seed) % length;
}

export function pickDeterministic<T>(items: readonly T[], seed: string): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty collection");
  }

  return items[hashToIndex(seed, items.length)];
}
