/**
 * Unit tests for premium helpers.
 *
 * Testea la lógica pura de shouldShowPremiumScreen y getDisplayPrice.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
    shouldShowPremiumScreen,
    getDisplayPrice,
    updatePriceCache,
    clearPriceCache,
    PREMIUM_MESSAGE_THRESHOLD,
} from './premiumHelpers';

// ============================================================
// shouldShowPremiumScreen
// ============================================================
describe('shouldShowPremiumScreen', () => {
    it('should return false if the user is already premium', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: 100,
            isPremium: true,
        });
        expect(result).toBe(false);
    });

    it('should return false if user has sent fewer messages than the threshold', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: PREMIUM_MESSAGE_THRESHOLD - 1,
            isPremium: false,
        });
        expect(result).toBe(false);
    });

    it('should return true when message count reaches the threshold and user is not premium', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: PREMIUM_MESSAGE_THRESHOLD,
            isPremium: false,
        });
        expect(result).toBe(true);
    });

    it('should return true when message count exceeds the threshold', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: PREMIUM_MESSAGE_THRESHOLD + 10,
            isPremium: false,
        });
        expect(result).toBe(true);
    });

    it('should return false with zero messages', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: 0,
            isPremium: false,
        });
        expect(result).toBe(false);
    });

    // --- Remote override tests ---
    it('should return true when remoteOverride is true, regardless of message count', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: 0,
            isPremium: false,
            remoteOverride: true,
        });
        expect(result).toBe(true);
    });

    it('should return false when remoteOverride is false, even if conditions are met', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: 100,
            isPremium: false,
            remoteOverride: false,
        });
        expect(result).toBe(false);
    });

    it('should return false when remoteOverride is true but user is premium', () => {
        const result = shouldShowPremiumScreen({
            userMessageCount: 0,
            isPremium: true,
            remoteOverride: true,
        });
        expect(result).toBe(false);
    });

    it('should fall back to message count logic when remoteOverride is null', () => {
        const belowThreshold = shouldShowPremiumScreen({
            userMessageCount: 1,
            isPremium: false,
            remoteOverride: null,
        });
        expect(belowThreshold).toBe(false);

        const atThreshold = shouldShowPremiumScreen({
            userMessageCount: PREMIUM_MESSAGE_THRESHOLD,
            isPremium: false,
            remoteOverride: null,
        });
        expect(atThreshold).toBe(true);
    });
});

// ============================================================
// getDisplayPrice
// ============================================================
describe('getDisplayPrice', () => {
    beforeEach(() => {
        clearPriceCache();
    });

    it('should return null for an invalid productId', () => {
        const result = getDisplayPrice('com.ejoi.nonexistent');
        expect(result).toBeNull();
    });

    it('should return null for a valid productId with no cached price', () => {
        const result = getDisplayPrice('com.ejoi.plan_amigo');
        expect(result).toBeNull();
    });

    it('should return the cached price for a valid productId', () => {
        updatePriceCache('com.ejoi.plan_amigo', '$12.990 / mes');
        const result = getDisplayPrice('com.ejoi.plan_amigo');
        expect(result).toBe('$12.990 / mes');
    });

    it('should return different prices for different productIds', () => {
        updatePriceCache('com.ejoi.plan_amigo', '$12.990 / mes');
        updatePriceCache('com.ejoi.plan_amigo_cercano', '$25.990 / mes');

        expect(getDisplayPrice('com.ejoi.plan_amigo')).toBe('$12.990 / mes');
        expect(getDisplayPrice('com.ejoi.plan_amigo_cercano')).toBe('$25.990 / mes');
    });

    it('should return null after clearing the cache', () => {
        updatePriceCache('com.ejoi.plan_amigo', '$12.990 / mes');
        clearPriceCache();
        const result = getDisplayPrice('com.ejoi.plan_amigo');
        expect(result).toBeNull();
    });
});

// ============================================================
// PREMIUM_MESSAGE_THRESHOLD
// ============================================================
describe('PREMIUM_MESSAGE_THRESHOLD', () => {
    it('should be a positive number', () => {
        expect(PREMIUM_MESSAGE_THRESHOLD).toBeGreaterThan(0);
    });

    it('should be a reasonable threshold (between 1 and 100)', () => {
        expect(PREMIUM_MESSAGE_THRESHOLD).toBeGreaterThanOrEqual(1);
        expect(PREMIUM_MESSAGE_THRESHOLD).toBeLessThanOrEqual(100);
    });
});
