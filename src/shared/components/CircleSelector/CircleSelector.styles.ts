import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center', 
  },

  optionContainer: {
    alignItems: 'center',
  },

  circleWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    ...Platform.select({
      default: {
        shadowColor: Colors.base.secondary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
      },
      web: {
        boxShadow: `0px 8px 16px ${Colors.base.secondary}33`,
      },
    }),
  },

  circleSelected: {
    borderWidth: 2,
    borderColor: Colors.base.primary,
    ...Platform.select({
      default: {
        shadowColor: Colors.base.primary,
        shadowOpacity: 0.15,
      },
      web: {
        boxShadow: `0px 8px 16px ${Colors.base.primary}26`,
      },
    }),
  },

  iconText: {
    color: Colors.base.secondary,
    fontFamily: Typography.fontFamily.medium,
  },

  iconTextSelected: {
    color: Colors.base.primary,
  },

  checkBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
      },
    }),
  },

  checkIcon: {
    fontSize: 18,
    color: Colors.base.primary,
    fontWeight: 'bold',
    lineHeight: 22,
  },

  label: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 120,
  },

  labelSelected: {
    color: Colors.base.primary,
    fontFamily: Typography.fontFamily.bold,
  },
});

const debugCircleStyle = StyleSheet.flatten(styles.circle) as Record<string, unknown>;
const debugCircleSelectedStyle = StyleSheet.flatten(styles.circleSelected) as Record<string, unknown>;
const debugCheckBadgeStyle = StyleSheet.flatten(styles.checkBadge) as Record<string, unknown>;
// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'shadow-dbg-2',hypothesisId:'H2',location:'CircleSelector.styles.ts:moduleInit',message:'circle selector styles resolved',data:{platform:Platform.OS,circleHasShadowColor:Object.prototype.hasOwnProperty.call(debugCircleStyle ?? {},'shadowColor'),circleHasBoxShadow:Object.prototype.hasOwnProperty.call(debugCircleStyle ?? {},'boxShadow'),selectedHasShadowColor:Object.prototype.hasOwnProperty.call(debugCircleSelectedStyle ?? {},'shadowColor'),selectedHasBoxShadow:Object.prototype.hasOwnProperty.call(debugCircleSelectedStyle ?? {},'boxShadow'),checkBadgeHasShadowColor:Object.prototype.hasOwnProperty.call(debugCheckBadgeStyle ?? {},'shadowColor'),checkBadgeHasBoxShadow:Object.prototype.hasOwnProperty.call(debugCheckBadgeStyle ?? {},'boxShadow')},timestamp:Date.now()})}).catch(()=>{});
// #endregion
