import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/shared/types/navigation';
import { GradientBackground, CardSurface, PrimaryCTA, ContentContainer } from '@/shared/components';
import { Colors } from '@/shared/theme/colors';
import { useSubscriptionStore } from '@/features/subscription/store/subscription.store';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SubscriptionPaywall'>;
type Rt = RouteProp<RootStackParamList, 'SubscriptionPaywall'>;

const PLANS = [
  { id: 'basic', title: 'Básico', price: '$X/mes', perks: ['Chat', 'Memoria básica'] },
  { id: 'pro', title: 'Pro', price: '$Y/mes', perks: ['Mejor memoria', 'Más opciones'] },
  { id: 'premium', title: 'Premium', price: '$Z/mes', perks: ['Todo Pro', 'Extras'] },
] as const;

export const SubscriptionPaywallScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { companion } = route.params;

  const selectedPlan = useSubscriptionStore((s) => s.selectedPlan);
  const selectPlan = useSubscriptionStore((s) => s.selectPlan);
  const confirmSubscription = useSubscriptionStore((s) => s.confirmSubscription);

  const isDisabled = useMemo(() => !selectedPlan, [selectedPlan]);

  const handleStartChat = () => {
    confirmSubscription();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Chat' }],
    });
  };

  return (
    <GradientBackground variant="wizard" overlayOpacity={0.06}>
      <ContentContainer>
        <Text style={styles.title}>Elige tu plan para continuar</Text>
        <Text style={styles.subtitle}>
          Para empezar a chatear con {companion?.name ?? 'tu compañer@'}, selecciona una opción.
        </Text>

        <View style={styles.grid}>
          {PLANS.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <Pressable key={p.id} onPress={() => selectPlan(p.id)} hitSlop={10}>
                <CardSurface variant="glass" padding="lg" textColor={Colors.text.primary}>
                  <View style={[styles.card, active && styles.cardActive]}>
                    <Text style={styles.planTitle}>{p.title}</Text>
                    <Text style={styles.planPrice}>{p.price}</Text>

                    <View style={styles.perks}>
                      {p.perks.map((perk) => (
                        <Text key={perk} style={styles.perk}>• {perk}</Text>
                      ))}
                    </View>

                    {active && <Text style={styles.selectedTag}>Seleccionado</Text>}
                  </View>
                </CardSurface>
              </Pressable>
            );
          })}
        </View>
      </ContentContainer>

      <PrimaryCTA label="Continuar" onPress={handleStartChat} disabled={isDisabled} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  title: { color: Colors.text.primary, fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: Colors.text.secondary, fontSize: 14, marginBottom: 16 },
  grid: { gap: 12 },
  card: { borderRadius: 16 },
  cardActive: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' },
  planTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4, color: Colors.text.primary },
  planPrice: { fontSize: 14, color: Colors.text.secondary, marginBottom: 10 },
  perks: { gap: 4 },
  perk: { fontSize: 13, color: Colors.text.secondary },
  selectedTag: { marginTop: 10, fontSize: 12, fontWeight: '600', color: Colors.text.primary },
});
