import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const getChipStyles = (size: 'sm' | 'md') => {
  const paddingVertical = size === 'sm' ? Spacing.xs : Spacing.sm;
  const paddingHorizontal = size === 'sm' ? Spacing.sm : Spacing.md;
  const fontSize = size === 'sm' ? Typography.fontSize.xs : Typography.fontSize.sm;

  return StyleSheet.create({
    chip: {
      paddingVertical,
      paddingHorizontal,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: Colors.auxiliary.secondary,
      backgroundColor: Colors.background.white,
      marginRight: Spacing.gapSm,
      marginBottom: Spacing.gapSm,
      alignSelf: 'flex-start',
      minHeight: 44,
      minWidth: 44,
    },
    chipSelected: {
      borderColor: Colors.base.secondary,
      backgroundColor: Colors.auxiliary.secondary,
      borderWidth: 2,
      ...Platform.select({
        default: {
          shadowColor: Colors.base.secondary,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
        web: {
          boxShadow: `0px 2px 6px ${Colors.base.secondary}66`,
        },
      }),
    },
    label: {
      fontSize,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.text.secondary,
      flexWrap: 'wrap',
    },
    labelSelected: {
      color: Colors.base.secondary,
      fontFamily: Typography.fontFamily.medium,
    },
  });
};

const debugChipStyles = getChipStyles('md');
const debugChipSelectedStyle = StyleSheet.flatten(debugChipStyles.chipSelected) as Record<string, unknown>;
// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'shadow-dbg-4',hypothesisId:'H4',location:'ChoiceChip.styles.ts:moduleInit',message:'choice chip styles resolved',data:{platform:Platform.OS,hasShadowColor:Object.prototype.hasOwnProperty.call(debugChipSelectedStyle ?? {},'shadowColor'),hasBoxShadow:Object.prototype.hasOwnProperty.call(debugChipSelectedStyle ?? {},'boxShadow')},timestamp:Date.now()})}).catch(()=>{});
// #endregion

