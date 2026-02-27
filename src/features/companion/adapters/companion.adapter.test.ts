import { describe, expect, it } from 'vitest';
import { fromCompanionApiResponse, toUpsertCompanionDto } from './companion.adapter';

describe('companion.adapter', () => {
  it('trunca name a 80 y normaliza arrays/opcionales', () => {
    const dto = toUpsertCompanionDto({
      name: `  ${'N'.repeat(120)}  `,
      visualStyle: ' anime ',
      gender: ' femenino ',
      interests: [' musica ', ' ', 'tecnologia'],
      boundaries: [' respeto ', ''],
      tone: '  cercano ',
      persona: '  empatica ',
      interactionStyle: '  casual ',
      conversationDepth: '  profunda ',
    });

    expect(dto.name).toHaveLength(80);
    expect(dto.visualStyle).toBe('anime');
    expect(dto.gender).toBe('femenino');
    expect(dto.interests).toEqual(['musica', 'tecnologia']);
    expect(dto.boundaries).toEqual(['respeto']);
    expect(dto.tone).toBe('cercano');
    expect(dto.persona).toBe('empatica');
  });

  it('asimila estructura companion anidada no estandar', () => {
    const response = fromCompanionApiResponse({
      companion: {
        id: 'c-1',
        name: 'Maya',
        visualStyle: 'anime',
        gender: 'neutro',
        persona: 'curiosa',
        tone: 'casual',
        interactionStyle: 'charla',
        conversationDepth: 'media',
        interests: ['arte'],
        boundaries: ['respeto'],
      },
    });

    expect(response).not.toBeNull();
    expect(response?.id).toBe('c-1');
    expect(response?.name).toBe('Maya');
  });

  it('inserta defaults ante payload parcial o ausente', () => {
    const response = fromCompanionApiResponse({
      data: {
        id: 'c-2',
        name: undefined as unknown as string,
        visualStyle: 'desconocido' as unknown as 'realista',
        gender: 'otro' as unknown as 'femenino',
        persona: undefined as unknown as string,
        tone: undefined as unknown as string,
        interactionStyle: undefined as unknown as string,
        conversationDepth: undefined as unknown as string,
        interests: undefined as unknown as string[],
        boundaries: undefined as unknown as string[],
      },
    });

    expect(response?.name).toBe('');
    expect(response?.visualStyle).toBe('realista');
    expect(response?.gender).toBe('femenino');
    expect(response?.persona).toBe('');
    expect(response?.tone).toBe('');
    expect(response?.interests).toEqual([]);
    expect(response?.boundaries).toEqual([]);
  });
});
