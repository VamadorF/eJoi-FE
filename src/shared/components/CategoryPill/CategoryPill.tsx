import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

interface CategoryPillProps {
  label: string;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    backgroundColor: Colors.base.primary,
    borderRadius: 24,
    ...Platform.select({
      default: {
        shadowColor: Colors.base.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      web: {
        boxShadow: `0px 4px 8px ${Colors.base.primary}4D`,
      },
    }),
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    lineHeight: 18, // 14 * 1.3
  },
});

const debugCategoryPillStyle = StyleSheet.flatten(styles.container) as Record<string, unknown>;
// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'shadow-dbg-5',hypothesisId:'H5',location:'CategoryPill.tsx:moduleInit',message:'category pill styles resolved',data:{platform:Platform.OS,hasShadowColor:Object.prototype.hasOwnProperty.call(debugCategoryPillStyle ?? {},'shadowColor'),hasBoxShadow:Object.prototype.hasOwnProperty.call(debugCategoryPillStyle ?? {},'boxShadow')},timestamp:Date.now()})}).catch(()=>{});
// #endregion

