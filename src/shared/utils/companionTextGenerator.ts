/**
 * Generador de textos dinámicos para el companion
 * Basado en las opciones de personalidad seleccionadas en el onboarding
 */

import { Companion } from '@/features/companion/types';

// ============ TIPOS ============
interface CompanionTexts {
  aboutMe: string;
  greeting: string;
  chatWelcome: string;
  shortDescription: string;
}

// ============ MAPEOS DE PERSONALIDAD ============

// Textos de "Sobre mí" según la personalidad principal
const ABOUT_ME_BY_PERSONA: Record<string, { femenino: string; masculino: string }> = {
  'Amigable y empática': {
    femenino: 'Me encanta conectar con las personas y entender cómo se sienten. Soy esa amiga que siempre está ahí para escucharte sin juzgar. Creo que cada conversación es una oportunidad para crear un vínculo especial.',
    masculino: 'Me encanta conectar con las personas y entender cómo se sienten. Soy ese amigo que siempre está ahí para escucharte sin juzgar. Creo que cada conversación es una oportunidad para crear un vínculo especial.',
  },
  'Divertida y desenfadada': {
    femenino: '¡La vida es demasiado corta para tomársela tan en serio! Me encanta hacer reír y encontrar el lado divertido de las cosas. Prepárate para conversaciones llenas de risas y buenos momentos.',
    masculino: '¡La vida es demasiado corta para tomársela tan en serio! Me encanta hacer reír y encontrar el lado divertido de las cosas. Prepárate para conversaciones llenas de risas y buenos momentos.',
  },
  'Inteligente y curiosa': {
    femenino: 'Mi mente nunca para de explorar. Me apasiona aprender cosas nuevas y debatir ideas interesantes. Si te gustan las conversaciones que te hacen pensar, nos vamos a llevar muy bien.',
    masculino: 'Mi mente nunca para de explorar. Me apasiona aprender cosas nuevas y debatir ideas interesantes. Si te gustan las conversaciones que te hacen pensar, nos vamos a llevar muy bien.',
  },
  'Cariñosa y comprensiva': {
    femenino: 'Tengo un corazón grande y me importa profundamente tu bienestar. Estoy aquí para darte ese apoyo cálido que todos necesitamos. Cuenta conmigo en los buenos y malos momentos.',
    masculino: 'Tengo un corazón grande y me importa profundamente tu bienestar. Estoy aquí para darte ese apoyo cálido que todos necesitamos. Cuenta conmigo en los buenos y malos momentos.',
  },
  'Energética y motivadora': {
    femenino: '¡Soy pura energía positiva! Me encanta motivar y celebrar cada pequeño logro. Si necesitas ese empujón para seguir adelante, aquí estoy para animarte.',
    masculino: '¡Soy pura energía positiva! Me encanta motivar y celebrar cada pequeño logro. Si necesitas ese empujón para seguir adelante, aquí estoy para animarte.',
  },
  'Tranquila y reflexiva': {
    femenino: 'Prefiero la calma y los momentos de introspección. Me gusta tomar las cosas con calma y reflexionar sobre lo que realmente importa. Soy tu refugio de paz en el caos del día a día.',
    masculino: 'Prefiero la calma y los momentos de introspección. Me gusta tomar las cosas con calma y reflexionar sobre lo que realmente importa. Soy tu refugio de paz en el caos del día a día.',
  },
  'Analítica y lógica': {
    femenino: 'Me gusta analizar las situaciones desde todos los ángulos. Si necesitas una perspectiva objetiva o resolver un problema, puedo ayudarte a ver las cosas con claridad.',
    masculino: 'Me gusta analizar las situaciones desde todos los ángulos. Si necesitas una perspectiva objetiva o resolver un problema, puedo ayudarte a ver las cosas con claridad.',
  },
  'Creativa y artística': {
    femenino: 'Veo el mundo como un lienzo lleno de posibilidades. Me inspira el arte, la música y todo lo que tenga un toque de creatividad. Juntos podemos explorar nuevas formas de expresión.',
    masculino: 'Veo el mundo como un lienzo lleno de posibilidades. Me inspira el arte, la música y todo lo que tenga un toque de creatividad. Juntos podemos explorar nuevas formas de expresión.',
  },
};

// Saludos según el tono
const GREETINGS_BY_TONE: Record<string, { femenino: string; masculino: string }> = {
  'Casual y relajado': {
    femenino: '¡Hey! ¿Qué tal tu día?',
    masculino: '¡Hey! ¿Qué tal tu día?',
  },
  'Formal y profesional': {
    femenino: 'Buenos días, ¿en qué puedo ayudarte hoy?',
    masculino: 'Buenos días, ¿en qué puedo ayudarte hoy?',
  },
  'Cariñoso y cercano': {
    femenino: '¡Hola cariño! Me alegra verte por aquí 💕',
    masculino: '¡Hola! Me alegra mucho verte por aquí 💕',
  },
  'Divertido y juguetón': {
    femenino: '¡Holaaa! ¿Listo para pasarla bien? 😄',
    masculino: '¡Holaaa! ¿Listo para pasarla bien? 😄',
  },
  'Serio y directo': {
    femenino: 'Hola. Cuéntame, ¿qué necesitas?',
    masculino: 'Hola. Cuéntame, ¿qué necesitas?',
  },
  'Inspirador y positivo': {
    femenino: '¡Hola! Espero que hoy sea un día increíble para ti ✨',
    masculino: '¡Hola! Espero que hoy sea un día increíble para ti ✨',
  },
  'Coloquial y natural': {
    femenino: '¡Buenas! ¿Cómo andas?',
    masculino: '¡Buenas! ¿Cómo andas?',
  },
  'Elegante y sofisticado': {
    femenino: 'Bienvenido, es un placer tenerte aquí.',
    masculino: 'Bienvenido, es un placer tenerte aquí.',
  },
};

// Mensajes de bienvenida del chat según personalidad y tono
const CHAT_WELCOME_TEMPLATES: Record<string, { femenino: string; masculino: string }> = {
  'Amigable y empática': {
    femenino: 'Me encanta que estemos conectados. Puedes contarme lo que sea, estoy aquí para escucharte.',
    masculino: 'Me encanta que estemos conectados. Puedes contarme lo que sea, estoy aquí para escucharte.',
  },
  'Divertida y desenfadada': {
    femenino: '¡Por fin! Ya me estaba aburriendo sin ti. ¿Qué aventuras tenemos para hoy?',
    masculino: '¡Por fin! Ya me estaba aburriendo sin ti. ¿Qué aventuras tenemos para hoy?',
  },
  'Inteligente y curiosa': {
    femenino: 'Tengo muchas ganas de saber qué está pasando por tu mente. ¿De qué hablamos hoy?',
    masculino: 'Tengo muchas ganas de saber qué está pasando por tu mente. ¿De qué hablamos hoy?',
  },
  'Cariñosa y comprensiva': {
    femenino: 'Me alegra mucho verte. ¿Cómo te has sentido últimamente? Cuéntame todo.',
    masculino: 'Me alegra mucho verte. ¿Cómo te has sentido últimamente? Cuéntame todo.',
  },
  'Energética y motivadora': {
    femenino: '¡Vamos con todo hoy! 💪 ¿Qué metas quieres conquistar?',
    masculino: '¡Vamos con todo hoy! 💪 ¿Qué metas quieres conquistar?',
  },
  'Tranquila y reflexiva': {
    femenino: 'Tómate tu tiempo. Aquí estoy cuando quieras compartir algo.',
    masculino: 'Tómate tu tiempo. Aquí estoy cuando quieras compartir algo.',
  },
  'Analítica y lógica': {
    femenino: 'Lista para analizar cualquier situación contigo. ¿Qué tienes en mente?',
    masculino: 'Listo para analizar cualquier situación contigo. ¿Qué tienes en mente?',
  },
  'Creativa y artística': {
    femenino: '¡Hoy puede ser un día lleno de inspiración! ¿Qué ideas tienes dando vueltas?',
    masculino: '¡Hoy puede ser un día lleno de inspiración! ¿Qué ideas tienes dando vueltas?',
  },
};

// Descripciones cortas según estilo de interacción
const SHORT_DESC_BY_INTERACTION: Record<string, { femenino: string; masculino: string }> = {
  'Conversación profunda': {
    femenino: 'Para conversaciones que importan',
    masculino: 'Para conversaciones que importan',
  },
  'Charla ligera y casual': {
    femenino: 'Para charlas sin complicaciones',
    masculino: 'Para charlas sin complicaciones',
  },
  'Apoyo emocional': {
    femenino: 'Tu apoyo incondicional',
    masculino: 'Tu apoyo incondicional',
  },
  'Compañía y entretenimiento': {
    femenino: 'Diversión garantizada',
    masculino: 'Diversión garantizada',
  },
  'Aprendizaje y crecimiento': {
    femenino: 'Creciendo juntos',
    masculino: 'Creciendo juntos',
  },
  'Motivación y coaching': {
    femenino: 'Tu coach personal',
    masculino: 'Tu coach personal',
  },
  'Amistad y complicidad': {
    femenino: 'Tu cómplice ideal',
    masculino: 'Tu cómplice ideal',
  },
  'Mentoría y guía': {
    femenino: 'Tu guía de confianza',
    masculino: 'Tu guía de confianza',
  },
};

// ============ FUNCIONES GENERADORAS ============

/**
 * Genera un texto "Sobre mí" personalizado basado en la configuración del companion
 */
export function generateAboutMe(companion: Companion): string {
  const gender = companion.gender || 'femenino';
  const persona = companion.personality;
  const tone = companion.tone;
  const interactionStyle = companion.interactionStyle;
  const interests = companion.interests || [];

  // Obtener la descripción base de la personalidad
  let aboutMe = ABOUT_ME_BY_PERSONA[persona]?.[gender] || 
    `Soy ${companion.name}, ${gender === 'femenino' ? 'encantada' : 'encantado'} de conocerte.`;

  // Añadir mención de intereses si hay
  if (interests.length > 0) {
    const interestsList = interests.slice(0, 3).join(', ');
    aboutMe += ` Me apasiona especialmente ${interestsList.toLowerCase()}.`;
  }

  // Añadir mención del estilo de interacción
  if (interactionStyle) {
    const styleDesc = SHORT_DESC_BY_INTERACTION[interactionStyle]?.[gender];
    if (styleDesc) {
      aboutMe += ` ${styleDesc}.`;
    }
  }

  return aboutMe;
}

/**
 * Genera un saludo personalizado según el tono del companion
 */
export function generateGreeting(companion: Companion): string {
  const gender = companion.gender || 'femenino';
  const tone = companion.tone;

  return GREETINGS_BY_TONE[tone]?.[gender] || 
    `¡Hola! Soy ${companion.name}. 👋`;
}

/**
 * Genera el mensaje de bienvenida del chat
 */
export function generateChatWelcome(companion: Companion): string {
  const gender = companion.gender || 'femenino';
  const persona = companion.personality;
  const name = companion.name;

  const welcomeBase = CHAT_WELCOME_TEMPLATES[persona]?.[gender] || 
    'Estoy aquí para conversar contigo. ¿En qué puedo ayudarte hoy?';

  return welcomeBase;
}

/**
 * Genera una descripción corta del companion
 */
export function generateShortDescription(companion: Companion): string {
  const gender = companion.gender || 'femenino';
  const interactionStyle = companion.interactionStyle;
  const persona = companion.personality;

  if (interactionStyle) {
    return SHORT_DESC_BY_INTERACTION[interactionStyle]?.[gender] || persona;
  }

  return persona;
}

/**
 * Genera todos los textos del companion de una vez
 */
export function generateCompanionTexts(companion: Companion): CompanionTexts {
  return {
    aboutMe: generateAboutMe(companion),
    greeting: generateGreeting(companion),
    chatWelcome: generateChatWelcome(companion),
    shortDescription: generateShortDescription(companion),
  };
}

/**
 * Genera un texto "Sobre mí" para el preview del onboarding
 * (usado en CreateCompanionScreen antes de crear el companion)
 */
export function generateAboutMePreview(
  persona: string,
  tone: string,
  gender: 'femenino' | 'masculino',
  interests: string[],
  interactionStyle?: string
): string {
  // Obtener la descripción base de la personalidad
  let aboutMe = ABOUT_ME_BY_PERSONA[persona]?.[gender] || 
    `Con un estilo ${tone.toLowerCase()} y una personalidad ${persona.toLowerCase()}.`;

  // Añadir mención de intereses si hay
  if (interests.length > 0) {
    const interestsList = interests.slice(0, 3).join(', ');
    aboutMe += ` Me apasiona especialmente ${interestsList.toLowerCase()}.`;
  }

  // Añadir mención del estilo de interacción
  if (interactionStyle) {
    const styleDesc = SHORT_DESC_BY_INTERACTION[interactionStyle]?.[gender];
    if (styleDesc) {
      aboutMe += ` ${styleDesc}.`;
    }
  }

  return aboutMe;
}

/**
 * Genera un saludo de preview basado en el tono
 */
export function generateGreetingPreview(
  tone: string,
  gender: 'femenino' | 'masculino',
  name?: string
): string {
  const greeting = GREETINGS_BY_TONE[tone]?.[gender];
  if (greeting) {
    return `¡Hola! Soy ${name || 'tu companion'}. ${greeting}`;
  }
  return `¡Hola! Soy ${name || 'tu companion'}. 👋`;
}

