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

// ─── Colores de ropa por tono ─────────────────────────────────────────────────

/**
 * Paleta de colores de ropa según el tono seleccionado.
 * Evita brown / tan / camel / muddy beige que gpt-image-1 tiende a usar por defecto.
 */
const CLOTHING_COLOR_BY_TONE: Record<string, string> = {
  warm:    'soft pink, muted rose, cream, soft coral, or dusty mauve',
  cool:    'soft blue, slate blue, cool gray, lavender-gray, or charcoal',
  neutral: 'gray, off-white, soft navy, muted green, or black',
  vibrant: 'teal, berry, cobalt, emerald, or a saturated but tasteful color',
  serious: 'navy, charcoal, deep green, burgundy, or black',
};

// ─── Estilos visuales ────────────────────────────────────────────────────────

/**
 * Cada estilo tiene un builder que genera la descripción visual.
 * Realista: aspecto candid/natural, diferenciado por género y tono.
 * Anime: prompt diferenciado por género con referencias de estilo específicas.
 */
const VISUAL_STYLE_CONFIG: Record<string, {
  buildPrompt: (gender: string, ethnicity: string, toneKey?: string) => string;
  avoidances: string;
}> = {
  realista: {
    buildPrompt: (gender: string, ethnicity: string, toneKey?: string) => {
      const clothingColors = CLOTHING_COLOR_BY_TONE[toneKey || 'neutral'] ?? CLOTHING_COLOR_BY_TONE['neutral'];

      // Instrucciones de edad/apariencia según género
      let ageAppearance: string;
      if (gender === 'woman') {
        ageAppearance = [
          'She is a young adult woman in her early-to-mid 20s.',
          'Soft natural youthful features — age-appropriate, not childlike and not middle-aged.',
          'Healthy natural facial fullness with a youthful glow.',
        ].join(' ');
      } else if (gender === 'man') {
        ageAppearance = 'He is a young adult man in his early-to-mid 20s with natural youthful features.';
      } else {
        ageAppearance = 'This is a young adult in their early-to-mid 20s with natural youthful features.';
      }

      const parts = [
        `A casual candid photo of a ${gender}, taken with a good smartphone or everyday camera indoors with available light.`,
      ];
      if (ethnicity) {
        parts.push(ethnicity);
      }
      parts.push(
        ageAppearance,
        // Naturalidad humana — reforzar que es FOTOGRAFÍA real
        'Shot on a real camera — natural lens distortion, slight depth-of-field blur, and real photographic grain.',
        'The person should have slight natural facial asymmetry and natural unevenness in expression.',
        'This should feel like a real candid moment — not perfectly posed, not a studio setup.',
        'Subtle flyaway hairs, minor skin texture variations, and a realistic smile that is not polished or advertisement-like.',
        // Cuerpo
        'This should look like an everyday person, not a fashion model.',
        'The person has a sturdy medium build with realistic natural body mass.',
        'Solid shoulders, a natural-width neck, and a fuller face — not thin or fragile-looking.',
        // Piel 
        'Real human skin with visible pores, fine lines, subtle blemishes, and uneven skin tone. Minimal makeup.',
        'The skin must look like real photographed skin, not smooth CGI or digitally painted.',
        // Encuadre
        'Centered subject, mid-shot portrait showing the head, shoulders, and upper torso.',
        'Everyday camera feel — not studio-perfect composition, not ad photography.',
        // Ropa
        `Modest casual everyday clothing with a higher neckline — such as a crew-neck t-shirt, knit sweater, hoodie, or casual jacket in ${clothingColors}.`,
        'Do NOT use brown, tan, camel, or muddy beige for the clothing color.',
      );
      return parts.join(' ');
    },
    avoidances: [
      'No borders, film strips, or decorative frames.',
      'Avoid fashion-model proportions — no unnaturally thin body, narrow shoulders, or hollow cheeks.',
      'No exposed collarbones, bare shoulders, or deep necklines.',
      'No glamour photography, editorial styling, heavy makeup, or airbrushed skin.',
      'No 3D render, CGI, or digitally painted look — this must read as a real photograph.',
      'No overly symmetrical face, plastic skin, or uncanny-valley perfection.',
    ].join(' '),
  },

  anime: {
    buildPrompt: (gender: string, ethnicity: string) => {
      const parts = [
        `Anime portrait of a young ${gender}.`,
        ...(ethnicity ? [ethnicity] : []),
        'Modern anime illustration with clean linework and soft cel shading.',
        'Head-and-shoulders composition.',
      ];

      if (gender === 'woman') {
        parts.push(
          'Manhwa-inspired art style with expressive eyes, subtle catchlight, and delicate facial lines.',
          'Hair with depth shading, multiple highlight layers, and flowing strands.',
          'Full color illustration — vibrant saturated palette, rich skin tones, colored hair and eyes. Not monochrome, not sketch, not lineart.',
        );
      } else if (gender === 'man') {
        parts.push(
          'Clearly masculine features, natural proportions, calm gentle expression.',
          'Textured hair with natural volume, warm natural coloring.',
        );
      } else {
        parts.push(
          'Androgynous features — a balanced mix of soft and defined facial lines.',
          'Hair with natural volume and highlights, warm muted tones.',
        );
      }

      return parts.join(' ');
    },
    avoidances: 'No duplicate faces, no extra cropped heads, no side panels, no collage. Avoid chibi, shoujo, photorealism, 3D render, and facial hair.',
  },
};

// ─── Personalidad → rasgos visuales ─────────────────────────────────────────

const PERSONA_TO_VISUAL: Record<string, string> = {
  friendly:     'with a warm relaxed smile, approachable, slightly imperfect candid expression',
  professional: 'with a calm natural expression, composed but not posed, relaxed confidence',
  playful:      'with a genuine candid laugh, not exaggerated, naturally caught mid-moment',
  calm:         'with a soft thoughtful expression, natural gaze, quietly at ease',
  energetic:    'with a lively expression, natural and spontaneous, caught in an unscripted moment',
};

const TONE_TO_VISUAL: Record<string, string> = {
  warm:    'Soft natural indoor window light with warm neutral tones. Realistic contrast, softly blurred but realistic background. Not golden hour, not glowy — just natural warmth.',
  cool:    'Overcast natural light with cool neutral tones. Crisp and grounded background, realistic contrast.',
  neutral: 'Even diffused soft light, neutral tones, balanced exposure. Clean and simple background.',
  vibrant: 'Bright natural light in a colorful but grounded environment. Vivid tones without looking artificial.',
  serious: 'Soft directional side light creating gentle shadows. Subdued tones, grounded and natural mood.',
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
    const weight = INTEREST_PRIORITY[interest] ?? 1;
    if (weight > topWeight) {
      topWeight = weight;
      topInterest = interest;
    }
  }

  return INTEREST_TO_BACKGROUND[topInterest] ?? DEFAULT_BACKGROUND;
}

// ─── Calidad por estilo ──────────────────────────────────────────────────────

const QUALITY_BY_STYLE: Record<string, string> = {
  realista: [
    'This should look like a real candid photo — natural lighting and minor imperfections.',
    'Believable everyday camera quality, not overly polished or retouched.',
    'Natural human proportions, not stylized beauty proportions.',
    'Realistic but casual — like a photo a friend took, not a professional shoot.',
  ].join(' '),
  anime: [
    'Manhwa-inspired character portrait with clean refined linework, soft shading, and polished modern styling.',
    'Clear focal subject with no extra cropped duplicates or repeated faces.',
    'One finished image only, with a simple composition and no extra visual elements'
  ].join(' '),
};

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
    'Generate one finished image only.',
    // 2. Sujeto, estilo, etnia y colores de ropa
    styleConfig.buildPrompt(gender, ethnicityDesc, toneKey),
    // 3. Expresión derivada de personalidad
    `The person is ${personaVisual}.`,
    // 4. Iluminación derivada del tono
    toneVisual,
    // 5. Fondo derivado del interés de mayor peso
    background,
    // 6. Calidad según estilo
    QUALITY_BY_STYLE[styleKey] ?? QUALITY_BY_STYLE.realista,
    // 7. Instrucciones de qué evitar
    styleConfig.avoidances,
  ];

  return sections.filter(Boolean).join(' ');
}
