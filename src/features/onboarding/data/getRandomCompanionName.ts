import { NAMES_BY_PERSONALITY, GenderId } from './companionNames';

const pickRandom = <T,>(arr: T[]): T | null => {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)] ?? null;
};

export function getRandomCompanionName(persona: string, gender: GenderId): string | null {
  const bucket = NAMES_BY_PERSONALITY[persona];
  if (!bucket) return null;
  return pickRandom(bucket[gender]);
}
