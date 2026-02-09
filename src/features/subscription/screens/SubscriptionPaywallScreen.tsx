import React, { useMemo } from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, ScrollView, ImageSourcePropType } from 'react-native';import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '@/shared/types/navigation';
import { GradientBackground, PrimaryCTA, ContentContainer } from '@/shared/components';
import { useSubscriptionStore, PlanId } from '@/features/subscription/store/subscription.store';

import { styles } from './SubscriptionPaywallScreen.styles';


type Nav = NativeStackNavigationProp<RootStackParamList, 'SubscriptionPaywall'>;
type Rt = RouteProp<RootStackParamList, 'SubscriptionPaywall'>;

type Plan = {
  id: PlanId;
  title: string;
  price: string;
  description: string;
  perks: string[];
  recommended?: boolean;
  image: ImageSourcePropType;
};


/// Estoy usando nombres de perks de Ko-fi, pero tenemos que discutir si estos nombres
// Se mantienen en la version final o no. Como tambien los precios! 
const PLANS: Plan[] = [
  {
    id: 'Amigo',
    title: 'Amigo',
    price: '$14.990 / mes',
    description:
      'Este plan es la puerta de entrada al vínculo. Permite iniciar una relación continua con tu compañer@ virtual y empezar a construir una historia compartida.',
    perks: ['Inicia la relación', 'Acceso al chat', 'Memoria básica'],
    image: require('@/assets/images/paywall/amigo.png'),
  },
  {
    id: 'Amigo Cercano',
    title: 'Amigo Cercano',
    price: '$24.990 / mes',
    description:
      'Este nivel está pensado para quienes deciden quedarse. La relación gana estabilidad, coherencia y profundidad: más conversaciones, más memoria y mayor continuidad en el tiempo.',
    perks: ['Más conversaciones', 'Memoria mejorada', 'Continuidad extendida'],
    recommended: true,
    image: require('@/assets/images/paywall/amigo-cercano.png'),
  },
  {
    id: 'Mejor Amigo',
    title: 'Mejor Amigo',
    price: '$39.990 / mes',
    description:
      'Este es el nivel más alto de compromiso y cercanía. La relación se vuelve prioritaria, con la máxima continuidad, memoria ampliada y el mayor volumen de interacción disponible.',
    perks: ['Máxima continuidad', 'Memoria ampliada', 'Prioridad y extras'],
    image: require('@/assets/images/paywall/mejor-amigo.png'),
  },
];

export const SubscriptionPaywallScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();

  const companion = route.params?.companion;

  const selectedPlan = useSubscriptionStore((s) => s.selectedPlan);
  const selectPlan = useSubscriptionStore((s) => s.selectPlan);
  const confirmSubscription = useSubscriptionStore((s) => s.confirmSubscription);

  const isDisabled = useMemo(() => !selectedPlan, [selectedPlan]);

  const handleContinue = () => {
    confirmSubscription();
    navigation.replace('Chat');
  };

  const screenW = Dimensions.get('window').width;
  const twoCols = screenW >= 520;

  return (
    <GradientBackground variant="wizard" overlayOpacity={0.06}>
      <ContentContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={{ flex: 1 }}
        >
          <Text style={styles.title}>Elige tu plan para continuar</Text>
          <Text style={styles.subtitle}>
            Para empezar a chatear con {companion?.name ?? 'tu compañer@'}, selecciona una opción.
          </Text>

          <View style={styles.grid}>
            {PLANS.map((p) => {
              const active = selectedPlan === p.id;

              return (
                <Pressable
                  key={p.id}
                  onPress={() => selectPlan(p.id)}
                  hitSlop={10}
                  style={({ pressed }) => [pressed && { opacity: 0.97 }]}
                >
                  <LinearGradient
                    colors={
                      active
                        ? ['#FF2D87', '#FF5FB4', '#C78BFF']
                        : ['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.12)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.cardOuter, active && styles.cardOuterActive]}
                  >
                    <View style={[styles.cardInner, active && styles.cardInnerActive]}>
                      <View style={styles.hero}>
                        <ImageBackground
                          source={p.image}
                          style={styles.heroBg}
                          imageStyle={styles.heroBgImg}
                          resizeMode="cover"
                        >
                          <LinearGradient
                            colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.48)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.heroOverlay}
                          />

                          <LinearGradient
                            colors={['rgba(0,0,0,0.20)', 'transparent', 'rgba(0,0,0,0.20)']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.heroVignette}
                          />
                        </ImageBackground>

                        {/* Hint arriba */}
                        <View style={[styles.tapPill, active && styles.tapPillActive]}>
                          <Text style={[styles.tapPillText, active && styles.tapPillTextActive]}>
                            {active ? 'Seleccionado' : 'Toca para elegir'}
                          </Text>
                        </View>

                        {/* Badge precio */}
                        <View style={[styles.pricePill, active && styles.pricePillActive]}>
                          <Text style={styles.pricePillText}>{p.price}</Text>
                        </View>
                      </View>

                      <View style={styles.body}>
                        <Text style={styles.planTitle}>{p.title}</Text>
                        <Text style={styles.description}>{p.description}</Text>

                        <View style={[styles.perks, twoCols && styles.perksTwoCols]}>
                          {p.perks.map((perk) => (
                            <View key={perk} style={[styles.perkRow, twoCols && styles.perkRowTwoCols]}>
                              <View style={[styles.checkDot, active && styles.checkDotActive]} />
                              <Text style={styles.perkText}>{perk}</Text>
                              </View>
                          ))}
                        </View>

                        {p.recommended && (
                          <View style={styles.recoPillWrapper}>
                            <View style={styles.recoPill}><Text style={styles.recoPillText}>Recomendado</Text></View>
                          </View>
                        )}

                        {active && (
                          <LinearGradient
                            colors={['rgba(255,45,135,0.22)', 'rgba(199,139,255,0.14)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.bottomAccent}
                          />
                        )}
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </ContentContainer>

      <PrimaryCTA label="Continuar" onPress={handleContinue} disabled={isDisabled} />
    </GradientBackground>
  );
};
