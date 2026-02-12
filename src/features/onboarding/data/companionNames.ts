import raw from './companionNames.json';

export type GenderId = 'femenino' | 'masculino' | 'neutro';

export type NamesBucket = {
  femenino: string[];
  masculino: string[];
  neutro: string[];
};

export type NamesByPersonality = Record<string, NamesBucket>;

export const NAMES_BY_PERSONALITY = raw as NamesByPersonality;
