import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

const PINK = '#FF2D87';
const LILAC = '#C78BFF';
const TEXT = '#1F1F1F';
const SUB = '#5B5B5B';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },

  // =========================
  // HERO (radio mayor)
  // =========================
  hero: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 14,
  },
  heroBg: {
    width: '100%',
    height: 235,
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
    bottom: 14,
  },
  heroTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 22,
    lineHeight: Math.round(22 * 1.2),
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    lineHeight: Math.round(13 * 1.35),
    color: 'rgba(255,255,255,0.90)',
  },

  // =========================
  // BENEFITS CARD (radio medio + superposición)
  // =========================
  benefitsCardOuter: {
    borderRadius: 20,
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 16,

    marginTop: -18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4,
  },
  benefitsCard: {
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.96)',
    padding: 16,
  },
  benefitsHeader: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: TEXT,
  },
  headerDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginTop: 10,
    marginBottom: 12,
  },

  benefitsList: {
    gap: 12,
    marginBottom: 12,
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
    fontSize: 14.8,
    lineHeight: Math.round(14.8 * 1.25),
    color: TEXT,
    marginBottom: 2,
  },
  benefitSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12.8,
    lineHeight: Math.round(12.8 * 1.35),
    color: SUB,
  },
  microNote: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: '#6A6A6A',
  },

  plansSection: {
    paddingBottom: 16,
  },
  plansTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.primary,
    marginBottom: 10,
  },

  planChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  planChipOuter: {
    borderRadius: 16,
    padding: 0,
  },

  planChipOuterRecommended: {
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
    width: 160,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
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

  recoMiniBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 45, 135, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 135, 0.26)',
    marginBottom: 8,
  },
  recoMiniBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 11,
    lineHeight: 17,
    color: PINK,
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
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: '#6A6A6A',
  },
});
