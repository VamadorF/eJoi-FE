import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

const PINK = '#FF2D87';
const TEXT = '#1F1F1F';
const SUB = '#5B5B5B';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },

  scrollContent: {
    paddingBottom: 120,
  },

  // =========================
  // HERO
  // =========================
  hero: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 10,
  },
  heroBg: {
    width: '100%',
    height: 175,
  },
  heroBgImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
  },
  heroTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 20,
    lineHeight: Math.round(20 * 1.18),
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12.5,
    lineHeight: Math.round(12.5 * 1.35),
    color: 'rgba(255,255,255,0.90)',
  },

  // =========================
  // BENEFITS
  // =========================
  benefitsCardOuter: {
    borderRadius: 20,
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 10,
    marginTop: -6,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4,
  },
  benefitsCard: {
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.96)',
    padding: 12,
  },
  benefitsHeader: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 15.5,
    lineHeight: 22,
    color: TEXT,
  },
  headerDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginTop: 8,
    marginBottom: 10,
  },

  benefitsList: {
    gap: 10,
    marginBottom: 10,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: 'rgba(255,45,135,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,45,135,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkMark: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 13,
    lineHeight: 14,
    color: PINK,
  },
  benefitTextBlock: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 14.5,
    lineHeight: Math.round(14.5 * 1.25),
    color: TEXT,
    marginBottom: 2,
  },
  benefitSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12.6,
    lineHeight: Math.round(12.6 * 1.35),
    color: SUB,
  },
  microNote: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: '#6A6A6A',
  },

  // =========================
  // PLANES
  // =========================
  plansSection: {
    paddingTop: 0,
    paddingBottom: 6,
  },
  plansTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 15.5,
    lineHeight: 22,
    color: Colors.text.primary,
    marginBottom: 8,
  },

  planChipsRow: {
    paddingLeft: 6,
    paddingRight: 28,
    paddingBottom: 6,
    gap: 10,
  },

  planChipOuter: {
    borderRadius: 16,
    padding: 2,
  },
  planChipOuterRecommended: {
    padding: 2,
    shadowColor: PINK,
    shadowOpacity: 0.10,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  planChipOuterActive: {
    borderRadius: 16,
    padding: 2,
    shadowColor: PINK,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },

  planChip: {
    width: 210,
    height: 124, 
    justifyContent: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  planChipInnerActive: {
    borderWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.98)',
  },
  planChipInnerRecommended: {
    borderColor: 'rgba(255,45,135,0.22)',
    backgroundColor: 'rgba(255,255,255,0.96)',
  },

  badgeSlot: {
    height: 30,
    justifyContent: 'flex-start',
    marginBottom: 6,
  },

  recoMiniBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 45, 135, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 135, 0.26)',
    marginBottom: 0, 
  },
  recoMiniBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 11,
    lineHeight: 17,
    color: PINK,
  },

  recoMiniBadgePlaceholder: {
    height: 26,
    width: 1,
    opacity: 0,
  },

  planChipTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 13,
    lineHeight: 18,
    color: TEXT,
    marginBottom: 6,
  },
  planChipTitleActive: {
    color: PINK,
  },
  planChipPrice: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 13,
    lineHeight: 18,
    color: TEXT,
  },
  planHint: {
    fontFamily: Typography.fontFamily.regular,
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 16,
    color: '#6A6A6A',
  },

  ctaDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,

    zIndex: 9999,
    elevation: 9999,
  },
  ctaFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
  },
  ctaButton: {
    height: 44,
    borderRadius: 14,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: PINK,
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  ctaButtonDisabled: {
    backgroundColor: 'rgba(255,45,135,0.45)',
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  ctaTextDisabled: {
    color: 'rgba(255,255,255,0.92)',
  },
});
