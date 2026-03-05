/**
 * Unit tests for premiumPlans configuration.
 *
 * Valida que la estructura de los planes es correcta y consistente.
 * Estos son los primeros tests del proyecto eJoi 🎉
 */
import { describe, it, expect } from 'vitest';
import { PREMIUM_PLANS, PremiumPlan } from './premiumPlans';

describe('PREMIUM_PLANS config', () => {
    it('should contain exactly 3 plans', () => {
        expect(PREMIUM_PLANS).toHaveLength(3);
    });

    it('each plan should have a non-empty id', () => {
        PREMIUM_PLANS.forEach((plan) => {
            expect(plan.id).toBeTruthy();
            expect(typeof plan.id).toBe('string');
            expect(plan.id.trim().length).toBeGreaterThan(0);
        });
    });

    it('each plan should have a non-empty title', () => {
        PREMIUM_PLANS.forEach((plan) => {
            expect(plan.title).toBeTruthy();
            expect(plan.title.trim().length).toBeGreaterThan(0);
        });
    });

    it('each plan should have a non-empty description', () => {
        PREMIUM_PLANS.forEach((plan) => {
            expect(plan.description).toBeTruthy();
            expect(plan.description.trim().length).toBeGreaterThan(0);
        });
    });

    it('each plan should have a non-empty productId', () => {
        PREMIUM_PLANS.forEach((plan) => {
            expect(plan.productId).toBeTruthy();
            expect(plan.productId.trim().length).toBeGreaterThan(0);
        });
    });

    it('all plan ids should be unique', () => {
        const ids = PREMIUM_PLANS.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('all productIds should be unique', () => {
        const productIds = PREMIUM_PLANS.map((p) => p.productId);
        const uniqueProductIds = new Set(productIds);
        expect(uniqueProductIds.size).toBe(productIds.length);
    });

    it('each plan should have benefits as a non-empty array', () => {
        PREMIUM_PLANS.forEach((plan) => {
            expect(Array.isArray(plan.benefits)).toBe(true);
            expect(plan.benefits.length).toBeGreaterThan(0);
        });
    });

    it('each benefit should have non-empty title and subtitle', () => {
        PREMIUM_PLANS.forEach((plan) => {
            plan.benefits.forEach((benefit) => {
                expect(typeof benefit.title).toBe('string');
                expect(benefit.title.trim().length).toBeGreaterThan(0);
                expect(typeof benefit.subtitle).toBe('string');
                expect(benefit.subtitle.trim().length).toBeGreaterThan(0);
            });
        });
    });

    it('at most one plan should be highlighted', () => {
        const highlightedPlans = PREMIUM_PLANS.filter((p) => p.highlighted === true);
        expect(highlightedPlans.length).toBeLessThanOrEqual(1);
    });

    it('badge should be a non-empty string when present', () => {
        PREMIUM_PLANS.forEach((plan) => {
            if (plan.badge !== undefined) {
                expect(typeof plan.badge).toBe('string');
                expect(plan.badge.trim().length).toBeGreaterThan(0);
            }
        });
    });
});
