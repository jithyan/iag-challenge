export function shuffle<T = any>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = 0; i < shuffled.length - 2; i++) {
    const randomPosition = getRandomInt(shuffled.length - i - 1) + i;
    const temp = shuffled[i];
    shuffled[i] = shuffled[randomPosition];
    shuffled[randomPosition] = temp;
  }

  return shuffled;
}

export function highlight(pw: string, guess: string): string[] {
  const correct = [];
  for (let i = 0; i < pw.length && i < guess.length; i++) {
    if (guess[i] === pw[i]) {
      correct.push(guess[i]);
    }
  }

  return correct;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateNumbers(): number[] {
  const numbers = new Set<number>();

  while (numbers.size < 8) {
    numbers.add(getRandomInt(10));
  }

  return Array.from(numbers);
}
