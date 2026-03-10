/**
 * Constantes del Paywall — planes de suscripción y límite free
 */
import type { PlanId } from '../store/subscription.store';

/** Límite de mensajes gratuitos antes de mostrar el paywall */
export const FREE_MESSAGE_LIMIT = 20;

export interface PaywallPlan {
    id: PlanId;
    title: string;
    subtitle: string;
    messages: number;
    priceFallback: string;
    productId: string;
    emoji: string;
    description: string;
    highlighted: boolean;
}

/**
 * Definición de los 3 planes de suscripción.
 * `priceFallback` se usa cuando el precio de la store aún no ha cargado.
 */
export const PAYWALL_PLANS: PaywallPlan[] = [
    {
        id: 'starter',
        title: 'Encuentro',
        subtitle: 'Para empezar suave',
        messages: 80,
        priceFallback: '$3.000',
        productId: 'com.ejoi.app.sub_starter_encuentro',
        emoji: '💬',
        description: 'Ideal para conocerse. 80 mensajes al mes para romper el hielo.',
        highlighted: false,
    },
    {
        id: 'conexion',
        title: 'Conexion',
        subtitle: 'Más conexión y continuidad',
        messages: 300,
        priceFallback: '$6.000',
        productId: 'com.ejoi.app.sub_standard_conexion',
        emoji: '💕',
        description: 'Conversaciones sin límites. 300 mensajes al mes para profundizar.',
        highlighted: true,
    },
    {
        id: 'plus',
        title: 'Siempre Contigo',
        subtitle: 'La experiencia completa',
        messages: 500,
        priceFallback: '$15.000',
        productId: 'com.ejoi.app.sub_plus_siempre_contigo',
        emoji: '👑',
        description: 'Sin restricciones. 500 mensajes al mes, prioridad total.',
        highlighted: false,
    },
];
