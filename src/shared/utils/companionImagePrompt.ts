/**
 * Generador de prompts para (gpt-image-1) basado en datos del onboarding 
 * Mejoras aplicadas:
 * - Estilo realista: aspecto natural/candid, sin look de modelo de revista
 * - Estilo anime: prompt diferenciado por género (masculino/femenino/neutro)
 * - Etnia: descripción física coherente según la selección del usuario
 * - Anti-collage: instrucción que fuerza composición única centrada
 * - Intereses: sistema de prioridad que elige UN solo fondo
 */
import { OnboardingData } from '@/features/onboarding/types';

// ─── Constantes de traducción ────────────────────────────────────────────────

const GENDER_TO_ENGLISH: Record<string, string> = {
  femenino: 'woman',
  masculino: 'man',
  neutro: 'androgynous person',
};

// ─── Etnia → descripción física ──────────────────────────────────────────────
const ETHNICITY_TO_DESCRIPTION: Record<string, string> = {
  // Keys = option.label exacto del onboarding (con acentos y mayúscula)
  // Descripciones explícitas y fuertes para que gpt-image-1 no las ignore
  'Latina':           'This person is Latino/Latina with warm olive to brown skin, dark brown or black hair, and Latin American facial features. The skin tone MUST be visibly olive or tan, not pale.',
  'Caucásica':        'This person is Caucasian/European with light or fair skin, light to medium colored hair, and European facial features.',
  'Afrodescendiente': 'This person is Black/of African descent with deep dark brown or rich dark skin tone, natural Black textured hair (afro, coils, locs, or braids), and African facial features. The skin MUST be visibly dark brown or deep brown, NOT light or medium.',
  'Asiática':         'This person is East Asian with light to medium skin tone, dark straight black hair, and East Asian facial features including monolid or hooded eyes.',
  'Árabe':            'This person is Arab/Middle Eastern with olive to tan skin tone, dark hair, and Middle Eastern facial features. The skin tone MUST be visibly olive or tan.',
  'India':            'This person is South Asian/Indian with medium to deep brown skin tone, dark black hair, and South Asian facial features. The skin MUST be visibly brown, not pale.',
  'Mixta':            'This person is mixed-race with ambiguous ethnic features, warm medium skin tone, and a blend of facial features from multiple ethnicities.',
};

// ─── Estilos visuales ────────────────────────────────────────────────────────

/**
 * Cada estilo tiene un builder que genera la descripción visual.
 * Realista: aspecto candid/natural,
 * Anime: prompt diferenciado por género con referencias de estilo específicas.
 */
const VISUAL_STYLE_CONFIG: Record<string, {
  buildPrompt: (gender: string, ethnicity: string) => string;
  avoidances: string;
}> = {
  realista: {
    buildPrompt: (gender: string, ethnicity: string) => {
      const parts = [
        `A candid photograph of a ${gender}.`,
      ];
      if (ethnicity) {
        parts.push(ethnicity);
      }
      parts.push(
        'The photo looks like it was taken on a camera with a subtle grain texture.',
        'This should look like an everyday person, not a fashion model',
        'The person has an average build with healthy natural body proportions',
        'Realistic shoulders, arms, neck, and facial fullness',
        'Natural skin with real texture — visible pores, light imperfections, minimal makeup.',
        'centered subject, rule of thirds, visually balanced composition.',
        'Soft diffused natural light, slightly uneven, as if shot indoors near a window.',
        'If any clothing is visible, it should be a casual top, sweater, or jacket.'
      );
      return parts.join(' ');
    },
    avoidances: [
      'Do not add any film strip borders, sprocket holes, film perforations, or vintage film frame edges around the image.',
      'Avoid overly thin or model-like body proportions.',
      'The image should have NO decorative borders or frames of any kind.',
      'Do not make it look like a professional studio headshot or glamour photography.',
      'Avoid airbrushed or retouched skin, perfect symmetry, heavy makeup, or fashion magazine aesthetics.',
      'Do not show hands, arms, or any CGI/3D render look.',
      'Do not include film strip borders, perforations, or frame numbers.',
      'Do not show bare shoulders, collarbone, or décolletage',
      'Avoid unnaturally narrow shoulders, tiny waist, hollow cheeks, or fragile-looking limbs',
      'Do not make the person extremely thin, underweight-looking, or fashion-model slim', 
      'Avoid hyperrealism.'   


    ].join(' '),
  },

  anime: {
    buildPrompt: (gender: string, ethnicity: string) => {
      const base = [
        `Anime-style character portrait of a ${gender}.`,
        ...(ethnicity ? [ethnicity] : []),
        'Drawn in the style of modern Japanese animation — clean confident linework, flat cel shading.',
        'Single character, close-up portrait with a soft bokeh background.',
      ];

      if (gender === 'woman') {
        return [
          ...base,
          'Inspired by modern manhwa art style with expressive eyes that have realistic iris detail and subtle catchlight.',
          'Soft line weight variation with delicate facial lines.',
          'Hair with depth shading, multiple highlight layers, and flowing strands.',
          'Vibrant saturated colors with warm skin tones.',
        ].join(' ');
      }

      if (gender === 'man') {
        return [
          ...base,
          'A single full-face close-up anime illustration, one character only.',
          'Mature facial structure with defined cheekbones, and slight stubble.',
          'Realistic iris detail with subtle catchlight and strong brow definition.',
          'Slightly bold outlines on features. Textured hair with natural volume.',
          'Muted warm tones with a grounded color palette.',
        ].join(' ');
      }

      // Neutro
      return [
        ...base,
        'Modern manhwa style with androgynous features — a balanced mix of soft and defined facial lines.',
        'Realistic iris detail with subtle catchlight.',
        'Hair with natural volume and highlights.',
        'Warm muted tones with a soft background.',
      ].join(' ');
    },
    avoidances: [
      'Do not use sparkling glitter eyes, shoujo style, chibi, or kawaii aesthetics.',
      'Avoid western comic book, sketch, crosshatching, or graphic novel styles.',
      'Do not make it photorealistic or 3D rendered.',
      'Do not create a split image, collage, or multiple characters.',
      'Do not add thumbnail images, small preview images, color swatches, or variant panels anywhere in the image — not on the sides, not on the corners, not anywhere',
      'Do not create a character sheet, reference sheet, or key visual with multiple views or poses of the same character',
      'There must be only ONE image with ONE character. No collage, no panels, no split layout',
      'No borders, no panels, no inset images, no sidebars, no UI elements of any kind.',
    ].join(' '),
  },
};

// ─── Personalidad → rasgos visuales ─────────────────────────────────────────

const PERSONA_TO_VISUAL: Record<string, string> = {
  friendly:     'with a warm genuine smile, head slightly tilted, looking approachable',
  professional: 'with a confident posture and direct eye contact, expression calm and composed',
  playful:      'laughing naturally, head thrown back slightly, a candid joyful moment',
  calm:         'with a serene expression and soft downward gaze, looking peaceful',
  energetic:    'with bright wide eyes and an enthusiastic open expression, full of energy',
};

const TONE_TO_VISUAL: Record<string, string> = {
  warm:    'Lit with golden hour lighting and warm tones, soft bokeh in the background.',
  cool:    'Lit with overcast natural light in cool neutral tones, crisp background.',
  neutral: 'Lit with diffused soft light, neutral background, balanced exposure.',
  vibrant: 'Lit with bright natural light in a colorful vivid environment.',
  serious: 'Lit with dramatic side lighting creating a moody atmospheric feel.',
};

// ─── Intereses → fondo ───────────────────────────────────────────────────────

/**
 * Peso visual de cada interés.
 * Con múltiples intereses, solo el de mayor peso define el fondo.
 * Esto evita que el generador de imagenes combine contextos y genere escenas confusas.
 *
 *   5 = fondos muy ricos visualmente
 *   4 = fondos buenos pero más comunes
 *   3 = fondos aceptables pero genéricos
 *   2 = fondos simples, solo ganan si no hay nada mejor
 *
 * En caso de empate, gana el que aparece primero en la lista del usuario.
 */
// Keys = labels exactos de INTEREST_OPTIONS en OnboardingScreen.tsx
const INTEREST_PRIORITY: Record<string, number> = {
  'Tecnología':       3,
  'Arte y cultura':   5,
  'Ciencia':          3,
  'Deportes':         3,
  'Música':           4,
  'Literatura':       4,
  'Cine y series':    4,
  'Viajes':           4,
  'Cocina':           3,
  'Filosofía':        3,
  'Psicología':       3,
  'Historia':         3,
  'Negocios':         3,
  'Salud y bienestar': 4,
  'Moda y estilo':    4,
};

const INTEREST_TO_BACKGROUND: Record<string, string> = {
  'Tecnología':       'The background is a modern home office with monitors softly glowing.',
  'Arte y cultura':   'The background is a cozy art studio with blurred canvases and warm string lights.',
  'Ciencia':          'The background is a bright minimal workspace with soft natural light from a nearby window.',
  'Deportes':         'The background is an outdoor field with natural light, softly blurred.',
  'Música':           'The background is a relaxed room with soft concert posters and a warm ambient glow.',
  'Literatura':       'The background is a cozy corner with a warm lamp and bookshelves blurred behind.',
  'Cine y series':    'The background is a cozy living room with soft ambient light and a screen glowing in the background.',
  'Viajes':           'The background is a café window with a city street softly blurred behind.',
  'Cocina':           'The background is a warm kitchen with shelves and herbs blurred behind.',
  'Filosofía':        'The background is a quiet study with bookshelves and soft warm light.',
  'Psicología':       'The background is a calm cozy space with plants and soft natural light.',
  'Historia':         'The background is a library with old books softly blurred behind.',
  'Negocios':         'The background is a modern office space with clean lines and soft lighting.',
  'Salud y bienestar': 'The background is an outdoor natural setting with soft sunlight and greenery.',
  'Moda y estilo':    'The background is a city street with boutiques softly blurred in natural daylight.',
};

const DEFAULT_BACKGROUND = 'The background is a cozy indoor space with soft warm ambient light.';

/**
 * Elige UN solo fondo basado en el interés de mayor peso visual.
 */
function buildContextFromInterests(interests: string[]): string {
  if (!interests.length) return DEFAULT_BACKGROUND;

  let topInterest = '';
  let topWeight = -1;

  for (const interest of interests) {
    const key = interest.toLowerCase();
    const weight = INTEREST_PRIORITY[key] ?? 1;
    if (weight > topWeight) {
      topWeight = weight;
      topInterest = key;
    }
  }

  return INTEREST_TO_BACKGROUND[topInterest] ?? DEFAULT_BACKGROUND;
}

// ─── Calidad global ───────────────────────────────────────────────────────────

const QUALITY_INSTRUCTIONS = [
  'Ultra detailed, high quality digital photograph.',
  'Natural lighting with soft shadows.',
  'Sharp focus with natural depth of field.',
  'The composition should be visually balanced.',
  'Highly detailed textures and realistic materials.',
  'The overall mood should feel immersive and atmospheric.',
].join(' ');

// ─── Generador principal ─────────────────────────────────────────────────────

/**
 * Genera un prompt basado en los datos del companion.
 * Retorna un solo string — gpt-image-1 no tiene parámetro de negative prompt,
 * las instrucciones de qué evitar van directamente en el prompt.
 */
export function generateCompanionImagePrompt(onboardingData: OnboardingData): string {
  const gender = GENDER_TO_ENGLISH[onboardingData.gender as string] || 'person';
  const styleKey = onboardingData.visualStyle as string;
  const styleConfig = VISUAL_STYLE_CONFIG[styleKey] ?? VISUAL_STYLE_CONFIG['realista'];

  // Etnia — solo se incluye si el usuario la seleccionó
  // Las keys del mapa coinciden con option.label del onboarding (ej. "Afrodescendiente")
  const ethnicityDesc = ETHNICITY_TO_DESCRIPTION[onboardingData.ethnicity || ''] || '';

  const personaKey = onboardingData.persona || 'friendly';
  const toneKey = onboardingData.tone || 'warm';
  const personaVisual = PERSONA_TO_VISUAL[personaKey] ?? PERSONA_TO_VISUAL['friendly'];
  const toneVisual = TONE_TO_VISUAL[toneKey] ?? TONE_TO_VISUAL['warm'];

  const interests = onboardingData.interests ?? [];
  const background = buildContextFromInterests(interests);

  const sections = [
    // 1. Instrucción de composición
    'Generate a single portrait image with one person only, centered composition.',
    // 2. Sujeto, estilo y etnia
    styleConfig.buildPrompt(gender, ethnicityDesc),
    // 3. Expresión derivada de personalidad
    `The person is ${personaVisual}.`,
    // 4. Iluminación derivada del tono
    toneVisual,
    // 5. Fondo derivado del interés de mayor peso
    background,
    // 6. Calidad global
    QUALITY_INSTRUCTIONS,
    // 7. Instrucciones de qué evitar
    styleConfig.avoidances,
  ];

  return sections.filter(Boolean).join(' ');
}
