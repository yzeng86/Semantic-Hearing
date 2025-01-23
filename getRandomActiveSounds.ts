export function getRandomActiveSounds(count: number): boolean[] {
  return Array.from({ length: 10 }, () => Math.random() < count / 10)
}

