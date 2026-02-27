import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 9999,
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        zIndex: 9999,
      },
    }),
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: Colors.base.primary,
    paddingVertical: Spacing.button.paddingVertical,
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    marginHorizontal: Spacing.screen.paddingHorizontal,
    marginBottom: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...Platform.select({
      default: {
        shadowColor: Colors.base.primary,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
      web: {
        boxShadow: `0px 4px 8px ${Colors.base.primary}4D`,
        cursor: 'pointer' as any,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...Typography.styles.button,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    lineHeight: 24, // 16 * 1.5 - valor absoluto en px
  },
  labelDisabled: {
    opacity: 0.6,
  },
});

const debugPrimaryButtonStyle = StyleSheet.flatten(styles.button) as Record<string, unknown>;
// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'shadow-dbg-1',hypothesisId:'H1',location:'PrimaryCTA.styles.ts:moduleInit',message:'primary cta style resolved',data:{platform:Platform.OS,hasShadowColor:Object.prototype.hasOwnProperty.call(debugPrimaryButtonStyle ?? {},'shadowColor'),hasShadowOffset:Object.prototype.hasOwnProperty.call(debugPrimaryButtonStyle ?? {},'shadowOffset'),hasBoxShadow:Object.prototype.hasOwnProperty.call(debugPrimaryButtonStyle ?? {},'boxShadow')},timestamp:Date.now()})}).catch(()=>{});
// #endregion

