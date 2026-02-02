import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';

export interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  children: ReactNode;
  footerContent?: ReactNode;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel = 'Siguiente',
  backLabel = 'Atrás',
  nextDisabled = false,
  showBack = true,
  children,
  footerContent,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.base.primary, Colors.base.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <View style={styles.content}>
          {children}
        </View>

        <View style={styles.footer}>
          {footerContent || (
            <>
              {showBack && onBack ? (
                <>
                  <Button
                    title={backLabel}
                    onPress={onBack}
                    variant="outline"
                    style={styles.backButton}
                  />
                  <Button
                    title={nextLabel}
                    onPress={onNext}
                    variant="primary"
                    disabled={nextDisabled}
                    style={styles.nextButton}
                  />
                </>
              ) : (
                <Button
                  title={nextLabel}
                  onPress={onNext}
                  variant="primary"
                  disabled={nextDisabled}
                  style={styles.nextButton}
                />
              )}
            </>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingTop: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});

