/**
 * Premium Plans Configuration
 *
 * Estructura editable para los 3 planes de suscripción premium.
 * El usuario puede completar manualmente los textos, beneficios y orden.
 *
 * NOTE: En el futuro, esta configuración podría cargarse desde un endpoint remoto
 * para permitir cambios dinámicos sin deploy (catálogo remoto).
 *
 * TODO: [BACKEND] Implementar endpoint GET /plans para catálogo remoto de planes
 * TODO: [ANALYTICS] Trackear qué plan se muestra, cuántas veces, y conversión
 */

export interface PremiumBenefit {
    /** Título del beneficio */
    title: string;
    /** Subtítulo descriptivo (acepta {name} como placeholder del companion) */
    subtitle: string;
}

export interface PremiumPlan {
    /** Identificador único del plan */
    id: string;
    /** Título visible del plan */
    title: string;
    /** Descripción breve */
    description: string;
    /** Lista de beneficios con título y subtítulo */
    benefits: PremiumBenefit[];
    /** Google Play product ID para billing */
    productId: string;
    /** Si este plan es el destacado/recomendado */
    highlighted?: boolean;
    /** Badge visual, ej. "Popular", "Mejor valor" */
    badge?: string;
    /**
     * Precio por defecto para mostrar antes de cargar desde billing SDK.
     * TODO: [BILLING] Una vez integrado react-native-iap, este campo
     *       sirve como fallback si la carga de precios falla.
     */
    defaultPrice: string;
}

/**
 * Configuración de los 3 planes premium.
 *
 * TODO: [BACKEND] Mapear productId con los IDs reales de Google Play Console.
 */
export const PREMIUM_PLANS: PremiumPlan[] = [
    {
        id: 'plan_amigo',
        title: 'Amigo',
        description: 'Para empezar suave',
        benefits: [
            { title: 'Acceso al chat', subtitle: 'Habla con {name} y rompe el hielo.' },
            { title: 'Memoria básica', subtitle: '{name} recuerda lo esencial para mantener contexto.' },
            { title: 'Acceso 24/7', subtitle: 'Disponible cuando lo necesites.' },
        ],
        productId: 'com.ejoi.plan_amigo', // TODO: verificar con Play Console
        defaultPrice: '$12.990 / mes',
    },
    {
        id: 'plan_amigo_cercano',
        title: 'Amigo Cercano',
        description: 'Más conexión y continuidad',
        benefits: [
            { title: 'Memoria emocional avanzada', subtitle: '{name} recuerda gustos y anécdotas importantes.' },
            { title: 'Continuidad extendida', subtitle: 'Conversaciones más fluidas en el tiempo.' },
            { title: 'Respuestas más profundas', subtitle: 'Más naturales y personalizadas.' },
        ],
        productId: 'com.ejoi.plan_amigo_cercano', // TODO: verificar con Play Console
        defaultPrice: '$25.990 / mes',
        highlighted: true,
        badge: 'Popular',
    },
    {
        id: 'plan_mejor_amigo',
        title: 'Mejor Amigo',
        description: 'La experiencia completa',
        benefits: [
            { title: 'Memoria ilimitada', subtitle: '{name} recuerda detalles y evolución de la relación.' },
            { title: 'Máxima continuidad', subtitle: 'Menos "reinicios", más conexión real.' },
            { title: 'Acceso prioritario', subtitle: 'Sé de los primeros en probar nuevas funciones.' },
        ],
        productId: 'com.ejoi.plan_mejor_amigo', // TODO: verificar con Play Console
        defaultPrice: '$64.990 / mes',
        badge: 'Mejor valor',
    },
];

