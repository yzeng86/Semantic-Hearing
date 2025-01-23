export function getRandomActiveSounds(count: number): boolean[] {
  const sounds = new Array(10).fill(false)
  for (let i = 0; i < count; i++) {
    let index
    do {
      index = Math.floor(Math.random() * 10)
    } while (sounds[index])
    sounds[index] = true
  }
  return sounds
}

